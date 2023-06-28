import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getContacts,
  getContactsByUserId,
  deleteContact,
  createContact,
} from "../controllers/contacts.controller.js";

const router = Router();

router.get("/contactos", authRequired, getContacts);
router.post("/contactos", authRequired, createContact);
router.get("/contactos/usuario/:id", authRequired, getContactsByUserId);
 
export default router;
