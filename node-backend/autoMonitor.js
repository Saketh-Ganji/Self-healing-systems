import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) console.error("❌ MySQL Connection Failed:", err);
  else console.log("✅ Auto-Monitoring Connected to Database");
});

// Random metric generator
function randomMetric(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to insert simulated metrics
function insertMetrics() {
  const cpu = randomMetric(10, 95).toFixed(2);
  const memory = randomMetric(20, 90).toFixed(2);
  const response = randomMetric(50, 500).toFixed(0);

  const metrics = [
    { name: "CPU Usage (%)", value: cpu },
    { name: "Memory Usage (%)", value: memory },
    { name: "Response Time (ms)", value: response },
  ];

  metrics.forEach(({ name, value }) => {
    let status = "NORMAL";
    if (value > 80) status = "CRITICAL";
    else if (value > 60) status = "WARNING";

    db.query(
      "INSERT INTO monitoring (metric_name, metric_value, status) VALUES (?, ?, ?)",
      [name, value, status],
      (err) => {
        if (err) console.error("❌ Error inserting metric:", err);
      }
    );

    // 🚨 Auto-generate alert if metric is critical
    if (status === "CRITICAL") {
      db.query(
        "INSERT INTO alerts (incident_type, severity, description, status) VALUES (?, ?, ?, ?)",
        [`${name} High`, "CRITICAL", `${name} is at ${value}%`, "OPEN"]
      );
      console.log(`🚨 Alert generated for ${name}: ${value}%`);
    }
  });

  console.log(`📊 Metrics updated: CPU ${cpu}%, Memory ${memory}%, Response ${response}ms`);
}

// Run every 10 seconds
setInterval(insertMetrics, 10000);
