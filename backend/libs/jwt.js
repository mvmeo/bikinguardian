import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {}, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};
