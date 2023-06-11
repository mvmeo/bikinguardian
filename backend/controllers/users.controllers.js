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

export const getUsers = async (req, res) => {
  pool.query(
    "SELECT id, admin, nombre, apellido, correo, rut, grupo_sanguineo, fecha_nacimiento, telefono FROM usuarios ORDER BY id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }

      res.status(200).json(results.rows); //devuelve un json con los usuarios
    }
  );
};
export const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(
    "SELECT id, admin, nombre, apellido, correo, rut, grupo_sanguineo, fecha_nacimiento, telefono FROM usuarios WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};
export const updatePassword = (req, res) => {
  const id = parseInt(req.params.id);
  const { contraseña } = req.body;

  pool.query(
    "UPDATE usuarios SET passwordHash = $1 WHERE id = $2",
    [contraseña, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User's password modified with ID: ${id}`);
    }
  );
};

export default {
  getUsers,
  getUserById,
  updatePassword,
};
