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

export const getEvents = (req, res) => {
  pool.query("SELECT * FROM eventos ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows); //devuelve un json con los usuarios
  });
};
export const getEventById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM eventos WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};
export const getEventsByUserId = (req, res) => {
  const userId = parseInt(req.params.id);

  pool.query(
    "SELECT * FROM eventos WHERE usuario_id = $1",
    [userId],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};
export const createEvent = (req, res) => {
  const { usuarioId, titulo, descripcion } = req.body;

  pool.query(
    "INSERT INTO eventos (usuario_id, titulo, descripcion) VALUES ($1, $2, $3) RETURNING *",
    [usuarioId, titulo, descripcion],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Event added with ID: ${results.rows[0].id}`);
    }
  );
};
export const deleteEvent = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM eventos WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(204).send(`Event deleted succesfully with ID: ${id}`);
  });
};
export const updateEvent = (req, res) => {
  const id = parseInt(req.params.id);
  const { usuarioId, estado } = req.body;

  pool.query(
    "UPDATE eventos SET estado = $1 WHERE usuario_id = $2 AND id = $3",
    [estado, usuarioId, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res
        .status(200)
        .send(
          `Event's state modified with ID: ${id} and user ID: ${usuarioId} y su estado es ${estado}`
        );
    }
  );
};

export const editEvent = (req, res) => {
  const id = parseInt(req.params.id);
  const { usuarioId, titulo, descripcion } = req.body;

  pool.query(
    "UPDATE eventos SET titulo = $1, descripcion = $2 WHERE usuario_id = $3 AND id = $4",
    [titulo, descripcion, usuarioId, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res
        .status(200)
        .send(
          `Event's state modified with ID: ${id} and user ID: ${usuarioId}`
        );
    }
  );
};


export default {
  getEvents,
  getEventById,
  getEventsByUserId,
  createEvent,
  deleteEvent,
  updateEvent,
};
