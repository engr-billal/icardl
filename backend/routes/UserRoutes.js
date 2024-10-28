import express from "express";
import {
  confirmEmail,
  deleteUser,
  getAllUsers,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  verifyLogin,
} from "../handlers/UserHandler.js";
import { checkAdmin, checkAuth } from "../middlewares/auth.js";

const UserRouter = express.Router();

UserRouter.get("/", checkAdmin, getAllUsers);
UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.get("/login", checkAuth, verifyLogin);
UserRouter.get("/confirm-email/:token", confirmEmail);
UserRouter.get("/logout", logoutUser);
UserRouter.delete("/:id", checkAdmin, deleteUser);
UserRouter.get("/:username", getUserProfile);

export default UserRouter;
