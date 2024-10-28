import { Router } from "express";
import {
  createRegistration,
  getAllRegistrations,
  getUserRegistrations,
  updateRegistrationStatus,
  deleteRegistration,
  getSingleRegistration,
} from "../handlers/RegistrationHandler.js";
import { checkAdmin, checkAuth } from "../middlewares/auth.js";

const RegistrationRouter = Router();

RegistrationRouter.get("/", checkAdmin, getAllRegistrations);
RegistrationRouter.get("/user", checkAuth, getUserRegistrations);
RegistrationRouter.post("/", checkAuth, createRegistration);
RegistrationRouter.get("/:registrationId", checkAuth, getSingleRegistration);
RegistrationRouter.patch(
  "/:registrationId",
  checkAdmin,
  updateRegistrationStatus
);
RegistrationRouter.delete("/:registrationId", checkAuth, deleteRegistration);

export default RegistrationRouter;
