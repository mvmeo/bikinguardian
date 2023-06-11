import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getContacts,
  getContactsByUserId,
  deleteContact,
  createContact,
} from "../controllers/contacts.controller.js";

const router = Router();

router.get("/notificaciones", authRequired, getContacts);
router.post("/notificaciones", authRequired, createContact);
router.delete("/notificacion/:id", authRequired, deleteContact);
router.get("/notificaciones/usuario/:id", authRequired, getContactsByUserId);

export default router;
