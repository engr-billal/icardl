import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
} from "../handlers/EventHandlers.js";
import { checkAdmin, checkAuth } from "../middlewares/auth.js";

const EventRouter = Router();

EventRouter.post("/", checkAuth, createEvent);
EventRouter.get("/", getAllEvents);
EventRouter.get("/:slug", getSingleEvent);
EventRouter.patch("/:eventId", checkAuth, updateEvent);
EventRouter.delete("/:eventId", checkAuth, deleteEvent);

export default EventRouter;
