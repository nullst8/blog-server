import express from "express";
import pool = require("./db");

const today = new Date().toLocaleDateString();

const app = express();
app.use(express.json());

app.get("/", (_req, res) => res.send("<h1>API</h1>"));

// get all blogs
app.get("/blogs", async (_req, res) => {
  const blogs = await pool.query("select * from bl");
  res.json(blogs.rows);
});

// get a blog
app.get("/blog/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await pool.query("select * from bl where id = $1", [id]);
  res.json(blog.rows[0]);
});

// post a blog
app.post("/blogs", async (req, res) => {
  const { title, description } = req.body;
  const newBlog = await pool.query(
    "insert into bl (title,description,date) values ($1,$2,$3) returning *",
    [title, description, today]
  );
  res.json(newBlog.rows[0]);
});

// update blog
app.put("/blog/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  pool.query("update bl set title = $1,description = $2 where id = $3", [
    title,
    description,
    id,
  ]);
  res.json("updated");
});

// delete blog
app.delete("/blog/:id", async (req, res) => {
  const { id } = req.params;
  pool.query("delete from bl where id = $1", [id]);
  res.json("deleted");
});

app.listen(process.env.PORT || 3001, () => console.log("server started"));
