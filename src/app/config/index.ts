import dotenv from "dotenv";
dotenv.config();

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  db_url: process.env.DB_URL,
};