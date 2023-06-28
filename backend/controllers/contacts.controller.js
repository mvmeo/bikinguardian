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

export const getContacts = (req, res) => {
  pool.query(
    "SELECT * FROM contactos ORDER BY id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows); //devuelve un json con los usuarios
    }
  );
};
export const createContact = (req, res) => {
  const { usuarioId, nombre, apellido, numeroTelefono } = req.body;

  pool.query(
    "INSERT INTO contactos (usuario_id, nombre, apellido, numero_telefono) VALUES ($1, $2, $3, $4) RETURNING *",
    [usuarioId, nombre, apellido, numeroTelefono],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Contact added with ID: ${results.rows[0].id}`);
    }
  );
};

export const deleteContact = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM contactos WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(204).send(`Contact deleted succesfully with ID: ${id}`);
  });
};

export const getContactsByUserId = (req, res) => {
  const userId = parseInt(req.params.id);

  pool.query(
    "SELECT * FROM contactos WHERE usuario_id = $1",
    [userId],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

export default {
  getContacts,
  createContact,
  deleteContact,
  getContactsByUserId,
};
