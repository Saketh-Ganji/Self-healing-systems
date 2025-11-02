// Import required modules
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

// Middleware to handle JSON data
app.use(express.json());

// MySQL Connection Setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Saki@1704',  // add your MySQL password if set
    database: 'self_healing_db' // replace with actual DB name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.log("❌ Database Connection Failed!", err);
    } else {
        console.log("✅ Database Connected Successfully!");
    }
});

// Default Route (Check API is working)
app.get('/', (req, res) => {
    res.send('Hello from Express API!');
});

// Example API to get data from a table
app.get('/users', (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// POST API to insert a user into the database
app.post('/add-user', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Name and Email are required!" });
    }

    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
    db.query(sql, [name, email], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Database insert failed!" });
        } else {
            res.status(201).json({ message: "User added successfully!", id: result.insertId });
        }
    });
});
// Add this below the existing routes

// ✅ POST API to add user
app.post("/add-user", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and Email are required" });
  }

  const query = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(query, [name, email], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.status(200).json({ message: "✅ User added successfully!" });
    }
  });
});
// UPDATE user by ID
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  db.query(sql, [name, email, id], (err, result) => {
    if (err) {
      console.error('❌ Error updating user:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    console.log(`✅ User ${id} updated`);
    res.json({ message: 'User updated successfully' });
  });
});


// 🗑 DELETE USER BY ID
app.delete("/delete-user/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      res.status(500).send("Error deleting user");
    } else {
      res.send("User deleted successfully");
    }
  });
});
// Update existing user
app.put('/update-user/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and Email are required' });
  }

  db.query(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, userId],
    (err, result) => {
      if (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json({ message: 'User updated successfully' });
      }
    }
  );
});

// Start the server
app.listen(port, () => {
    console.log(`✅ Server is running at http://localhost:${port}`);
});
