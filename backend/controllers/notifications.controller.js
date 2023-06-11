import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: 5432,
});

export const getNotifications = (req, res) => {
  pool.query(
    "SELECT * FROM notificaciones ORDER BY id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows); //devuelve un json con los usuarios
    }
  );
};
export const createNotifications = (req, res) => {
  const { usuarioId, descripcion } = req.body;

  pool.query(
    "INSERT INTO notificaciones (usuario_id, descripcion) VALUES ($1, $2) RETURNING *",
    [usuarioId, descripcion],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Notification added with ID: ${results.rows[0].id}`);
    }
  );
};
export const deleteNotification = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(
    "DELETE FROM notificaciones WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(204).send(`Notificacion deleted succesfully with ID: ${id}`);
    }
  );
};

export const deleteNotifications = (req, res) => {
  pool.query("DELETE FROM notificaciones", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(204).send(`Notificacions deleted succesfully`);
  });
};

export default {
  getNotifications,
  createNotifications,
  deleteNotification,
};
