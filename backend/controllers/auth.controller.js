import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: 5432,
});

export const register = async (req, res) => {
  const {
    nombre,
    apellido,
    correo,
    password,
    rut,
    telefono,
    grupoSanguineo,
    fechaNacimiento,
  } = req.body;

  try {
    // valida que no exista el rut ni el correo

    const userFound = await pool.query(
      "SELECT * FROM usuarios WHERE rut = $1 OR correo = $2",
      [rut, correo]
    );
    if (userFound.rows.length > 0) {
      return res
        .status(400)
        .json([
          "El usuario ya existe. Ingresa otrto RUT y/o correo electrónico.",
        ]);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    pool.query(
      "INSERT INTO usuarios (nombre, apellido, correo, passwordHash, rut, telefono, grupo_sanguineo, fecha_nacimiento) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        nombre,
        apellido,
        correo,
        passwordHash,
        rut,
        telefono,
        grupoSanguineo,
        fechaNacimiento,
      ],
      async (error, results) => {
        if (error) throw error;

        const newUser = {
          id: results.rows[0].id,
          admin: results.rows[0].admin,
          nombre: results.rows[0].nombre,
          apellido: results.rows[0].apellido,
          correo: results.rows[0].correo,
          rut: results.rows[0].rut,
          telefono: results.rows[0].telefono,
          grupoSanguineo: results.rows[0].grupo_sanguineo,
          fechaNacimiento: results.rows[0].fecha_nacimiento,
        };

        const id = results.rows[0].id.toString();
        const token = await createAccessToken(id);
        res.status(201).cookie("token", token).json(newUser);
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    pool.query(
      "SELECT * FROM usuarios WHERE correo = $1",
      [correo],
      async (error, results) => {
        if (error) throw error;

        if (results.rows.length === 0) {
          return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(
          password,
          results.rows[0].passwordhash
        );
        if (!isMatch) {
          return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const User = {
          id: results.rows[0].id,
          admin: results.rows[0].admin,
          nombre: results.rows[0].nombre,
          apellido: results.rows[0].apellido,
          correo: results.rows[0].correo,
          rut: results.rows[0].rut,
          telefono: results.rows[0].telefono,
          grupoSanguineo: results.rows[0].grupo_sanguineo,
          fechaNacimiento: results.rows[0].fecha_nacimiento,
        };

        const id = results.rows[0].id.toString();
        const token = await createAccessToken(id);
        res.status(201).cookie("token", token).json(User);
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
};

export const profile = (req, res) => {
  const id = req.user;

  pool.query("SELECT * FROM usuarios WHERE id = $1", [id], (error, results) => {
    if (error) throw error;

    const User = {
      id: results.rows[0].id,
      admin: results.rows[0].admin,
      nombre: results.rows[0].nombre,
      apellido: results.rows[0].apellido,
      correo: results.rows[0].correo,
      rut: results.rows[0].rut,
      telefono: results.rows[0].telefono,
      grupoSanguineo: results.rows[0].grupo_sanguineo,
      fechaNacimiento: results.rows[0].fecha_nacimiento,
    };

    res.status(200).json(User);
  });
};

export const changePassword = async (req, res) => {
  const {id, password, newPassword } = req.body;

  try {
    pool.query(
      "SELECT * FROM usuarios WHERE id = $1",
      [id],
      async (error, results) => {
        if (error) throw error;
        
        const isMatch = await bcrypt.compare(
          password,
          results.rows[0].passwordhash
        );
        if (!isMatch) {
          return res.status(400).json({ message: "Contraseña incorrecta" });
        }
        
        const passwordHash = await bcrypt.hash(newPassword, 10);
        
        pool.query(
          "UPDATE usuarios SET passwordHash = $1 WHERE id = $2",
          [passwordHash, id],
          (error, results) => {
            if (error) throw error;

            res.status(200).json({ message: "Contraseña actualizada" });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = (req, res) => {
  const { id } = req.body;

  pool.query("DELETE FROM usuarios WHERE id = $1", [id], (error, results) => {
    if (error) throw error;

    res.status(200).json({ message: "Usuario eliminado" });
  });
};

export const recoveryPassword = async (req, res) => {
  const { correo } = req.body;

  try {
    pool.query(
      "SELECT * FROM usuarios WHERE correo = $1",
      [correo],
      async (error, results) => {
        if (error) throw error;

        if (results.rows.length === 0) {
          return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const newPassword = Math.random().toString(36).slice(-8);
        const passwordHash = await bcrypt.hash(newPassword, 10);

        pool.query(
          "UPDATE usuarios SET passwordHash = $1 WHERE correo = $2",
          [passwordHash, correo],
          (error, results) => {
            if (error) throw error;

            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
              },
            });

            const mailOptions = {
              from: process.env.EMAIL,
              to: correo,
              subject: "Recuperación de contraseña",
              text: `Su nueva contraseña es: ${newPassword}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });

            res.status(200).json({ message: "Contraseña actualizada" });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyToken = (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }
    req.user = user.id;

    pool.query(
      "SELECT * FROM usuarios WHERE id = $1",
      [user],
      (error, results) => {
        if (error) throw error;

        const User = {
          id: results.rows[0].id,
          admin: results.rows[0].admin,
          nombre: results.rows[0].nombre,
          apellido: results.rows[0].apellido,
          correo: results.rows[0].correo,
          rut: results.rows[0].rut,
          telefono: results.rows[0].telefono,
          grupoSanguineo: results.rows[0].grupo_sanguineo,
          fechaNacimiento: results.rows[0].fecha_nacimiento,
        };

        res.status(200).json(User);
      }
    );

  });
};
