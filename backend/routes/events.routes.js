import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";

import {
  getEvents,
  getEventById,
  createEvent,
  deleteEvent,
  updateEvent,
  getEventsByUserId,
  editEvent,
} from "../controllers/events.controllers.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createEventSchema } from "../schemas/events.schema.js";
const router = Router();

router.get("/eventos", authRequired, getEvents);
router.post(
  "/eventos",
  authRequired,
  validateSchema(createEventSchema),
  createEvent
);
router.get("/evento/:id", authRequired, getEventById);
router.get("/eventos/usuario/:id", authRequired, getEventsByUserId);
router.delete("/evento/:id", authRequired, deleteEvent);
router.put("/evento/:id", authRequired, updateEvent);
router.patch("/evento/:id", authRequired, editEvent);

export default router;
