import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  host: process.env.HOST,
  port: 5432,
  user: process.env.USR,
  database: process.env.DB,
  password: process.env.PASSWD,
});

export = pool;
