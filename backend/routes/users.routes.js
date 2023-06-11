import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getUsers,
  getUserById,
  updatePassword,
} from "../controllers/users.controllers.js";

const router = Router();

router.get("/usuarios", authRequired, getUsers);
// app.patch('/api/usuarios/:id', updatePassword);
router.get("/usuario/:id", authRequired, getUserById);

export default router;
