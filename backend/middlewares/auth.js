import User from "../models/UserModel.js";
import { verifyToken } from "../utils/jwt.js";

export const checkAdmin = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const { userId } = verifyToken(token);
    const user = await User.findById(userId).select(
      "-password -verificationKey -resetPasswordKey"
    );
    if (!user)
      return res
        .status(101)
        .json({ message: "Unauthorized: No token provided" });
    if (user.role !== "Admin") {
      console.log(user.role);
      return res
        .status(101)
        .json({ message: "Unauthorized: Not enogh permissions" });
    }
    req.user = user.toObject();
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export const checkAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const { userId } = verifyToken(token);
    const user = await User.findById(userId).select(
      "-password -verificationKey -resetPasswordKey"
    );
    if (!user)
      return res
        .status(101)
        .json({ message: "Unauthorized: No token provided" });
    req.user = user.toObject();
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
