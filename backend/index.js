import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

import auhtRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import eventRoutes from "./routes/events.routes.js";
import notificationRoutes from "./routes/notifications.routes.js";
import contactRoutes from "./routes/contacts.routes.js";

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use("/api", auhtRoutes);
app.use("/api", userRoutes);
app.use("/api", eventRoutes);
app.use("/api", notificationRoutes);
app.use("/api", contactRoutes);
app.get("/", (req, res) => {
  res.send(
    "API de Bikinguardian. Proyecto de Ingeniría de Software, por Samuel Angulo, Guandingyi Qi, Pedro Sandoval y Nicolás Guerra"
  );
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));
