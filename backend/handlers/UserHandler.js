import User from "../models/UserModel.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { sendConfirmationEmail } from "./EmailHandler.js";

export const getAllUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const users = await User.paginate(
      {},
      {
        page,
        limit,
        select: "-__v -password -verificationKey -resetPasswordKey",
      }
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const key = uuidv4();
    const token = jwt.sign({ userId: user._id, key }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    user.verificationKey = key;
    user.save();
    await sendConfirmationEmail(user.email, token);
    res.status(201).json({
      message:
        "Registration successfull, please verify your email by opening the link we just mailed you.",
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      const key = Object.keys(err.keyValue)[0];
      res.status(403).json({
        message: `User with this ${key} already exists`,
      });
    }
    res.status(206).json({ message: err.message });
  }
};

export const verifyLogin = async (req, res) => {
  if (req.user) {
    try {
      const user = await User.findById(req.user._id).select(
        "-password -verificationKey -resetPasswordKey"
      );
      res.json(user);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong, please try again" });
    }
  } else res.status(403).json({ message: "Unauthorized! Not token provided." });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select(
      "-verificationKey -resetPasswordKey"
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.verified) {
      const key = uuidv4();
      const token = jwt.sign(
        { userId: user._id, key },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      user.verificationKey = key;
      user.save();
      await sendConfirmationEmail(user.email, token);
      return res
        .status(403)
        .json({ message: "Email not verified, check your inbox" });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 24 * 60 * 60 * 1000,
    }); // 10 days expiration
    res.status(200).json({ ...user.toObject(), password: undefined });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong please try again" });
  }
};

export const confirmEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const { userId, key } = verifyToken(token);
    const user = await User.findById(userId).select("verificationKey");
    if (user.verificationKey === key) {
      user.verified = true;
      user.verificationKey = "";
      await user.save();
      res.status(301).redirect(process.env.FRONTEND_URLS.split(" ")[0]);
    } else {
      res.status(406).send("Invalid Verification Key");
    }
  } catch (err) {
    res.status(403).send("Invalid Token");
  }
};

export const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).select(
      "-password -verificationKey -resetPasswordKey"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.toObject());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};
