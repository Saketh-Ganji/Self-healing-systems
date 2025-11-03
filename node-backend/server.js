const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "devops-mysql",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "usersdb",
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.log("❌ Database Connection Failed!", err);
  } else {
    console.log("✅ Database Connected Successfully!");
  }
});

// --- Routes ---
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, name, email });
  });
});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.query("UPDATE users SET name=?, email=? WHERE id=?", [name, email, id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ id, name, email });
  });
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id=?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
