import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  database: "blog",
});

export = pool;
