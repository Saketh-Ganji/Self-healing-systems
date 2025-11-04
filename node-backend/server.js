import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
console.log("🔍 Loaded DB details:", process.env.DB_USER, process.env.DB_PASSWORD);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// ===========================
// 🗄️ MySQL Connection
// ===========================
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD.trim() : "", // ✅ fixed env variable
  database: process.env.DB_NAME || "self_healing_db",
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err);
  } else {
    console.log("✅ MySQL Connected Successfully");
  }
});

// ===========================
// 🏠 ROOT
// ===========================
app.get("/", (req, res) => {
  res.send("🚀 Self-Healing Backend Running...");
});

// ===========================
// 👥 USERS
// ===========================
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// ===========================
// 🧾 LOGS
// ===========================
app.get("/logs", (req, res) => {
  db.query("SELECT * FROM logs ORDER BY created_at DESC", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

app.post("/logs", (req, res) => {
  const { service_name, log_level, message } = req.body;

  db.query(
    "INSERT INTO logs (service_name, log_level, message) VALUES (?, ?, ?)",
    [service_name, log_level, message],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      // Auto-create alert if log level is ERROR
      if (log_level === "ERROR") {
        db.query(
          "INSERT INTO alerts (incident_type, severity, description, status) VALUES (?, ?, ?, ?)",
          [
            `Error in ${service_name}`,
            "HIGH",
            message,
            "OPEN"
          ]
        );
      }

      res.json({ message: "Log entry added successfully (auto-alert checked)" });
    }
  );
});


// ===========================
// 🚨 ALERTS
// ===========================
app.get("/alerts", (req, res) => {
  db.query("SELECT * FROM alerts ORDER BY created_at DESC", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

app.post("/alerts", (req, res) => {
  const { incident_type, severity, description, status } = req.body;
  db.query(
    "INSERT INTO alerts (incident_type, severity, description, status) VALUES (?, ?, ?, ?)",
    [incident_type, severity, description, status],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Alert added successfully" });
    }
  );
});

// ===========================
// 📊 MONITORING
// ===========================
app.get("/monitoring", (req, res) => {
  db.query("SELECT * FROM monitoring ORDER BY created_at DESC", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

app.post("/monitoring", (req, res) => {
  const { metric_name, metric_value, status } = req.body;
  db.query(
    "INSERT INTO monitoring (metric_name, metric_value, status) VALUES (?, ?, ?)",
    [metric_name, metric_value, status],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Monitoring data added successfully" });
    }
  );
});

app.get("/health", (req, res) => {
  db.ping((err) => {
    if (err) return res.status(500).send("❌ Database Connection Error");
    res.send("✅ Server and Database Healthy");
  });
});


// ===========================
// 🚀 START SERVER
// ===========================
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
