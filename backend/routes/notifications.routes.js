import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getNotifications,
  deleteNotification,
  createNotifications,
  deleteNotifications,
} from "../controllers/notifications.controller.js";

const router = Router();

router.get("/notificaciones", authRequired, getNotifications);
router.post("/notificaciones", authRequired, createNotifications);
router.delete("/notificacion/:id", authRequired, deleteNotification);
router.delete("/notificaciones", authRequired, deleteNotifications);

export default router;
 