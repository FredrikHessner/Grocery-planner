// server.js
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Test database connection
pool.connect((err) => {
  if (err) {
    console.error("Error connecting to the database", err);
  } else {
    console.log("Connected to PostgreSQL database");
  }
});

// Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/ingredients", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM ingredients"); // Replace 'your_table_name' with your actual table
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/add-ingredient", async (req, res) => {
    const { ingredient, quantity, measurement } = req.body;
  
    // Validate input
    if (!ingredient || !quantity || !measurement) {
      return res.status(400).send("All fields (ingredient, quantity, measurement) are required.");
    }
  
    try {
      const query = `
        INSERT INTO ingredients (ingredient, quantity, measurement)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const values = [ingredient, quantity, measurement];
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]); // Return the newly added record
    } catch (err) {
      console.error("Error inserting data into the database:", err.message);
      res.status(500).send("Internal Server Error");
    }
  });

  app.delete("/ingredients/:ingredient", async (req, res) => {
    const { ingredient } = req.params;
  
    try {
      const result = await pool.query("DELETE FROM ingredients WHERE ingredient = $1", [ingredient]);
      if (result.rowCount > 0) {
        res.status(200).send({ message: "Ingredient deleted successfully" });
      } else {
        res.status(404).send({ message: "Ingredient not found" });
      }
    } catch (err) {
      console.error("Error deleting ingredient:", err.message);
      res.status(500).send("Server error");
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
