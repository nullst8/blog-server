"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pool = require("./db");
const today = new Date().toLocaleDateString();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (_req, res) => res.send("<h1>API</h1>"));
app.get("/blogs", async (_req, res) => {
    const blogs = await pool.query("select * from bl");
    res.json(blogs.rows);
});
app.get("/blog/:id", async (req, res) => {
    const { id } = req.params;
    const blog = await pool.query("select * from bl where id = $1", [id]);
    res.json(blog.rows[0]);
});
app.post("/blogs", async (req, res) => {
    const { title, description } = req.body;
    const newBlog = await pool.query("insert into bl (title,description,date) values ($1,$2,$3) returning *", [title, description, today]);
    res.json(newBlog.rows[0]);
});
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
app.delete("/blog/:id", async (req, res) => {
    const { id } = req.params;
    pool.query("delete from bl where id = $1", [id]);
    res.json("deleted");
});
app.listen(process.env.PORT || 3001, () => console.log("server started"));
//# sourceMappingURL=index.js.map