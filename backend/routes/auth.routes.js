import { Router } from "express";

import {
  register,
  login,
  logout,
  profile,
  verifyToken,
  deleteUser,
  recoveryPassword,
  changePassword
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { editProfile } from "../controllers/users.controllers.js";
const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);
router.patch("/profile/:id", authRequired, editProfile);
router.delete("/delete/user/:id", authRequired, deleteUser);
router.post("/recovery-password", recoveryPassword);
router.patch("/change-password", authRequired, changePassword);

router.get("/verifyToken", verifyToken);

export default router;
