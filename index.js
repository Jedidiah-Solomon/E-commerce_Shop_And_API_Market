const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // Add this line to load environment variables for local machine using .env file

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Database configuration
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database");
});

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/src/styles", express.static(path.join(__dirname, "src/styles")));
app.use("/src/scripts", express.static(path.join(__dirname, "src/scripts")));
app.use("/src/pages", express.static(path.join(__dirname, "src/pages")));
app.use("/public/img", express.static(path.join(__dirname, "public/img")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Serve home.html from the root directory
app.get("/home.html", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

// Sign-up endpoint
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const checkEmailQuery = "SELECT * FROM members WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const insertQuery =
      "INSERT INTO members (username, email, password) VALUES (?, ?, ?)";
    db.query(insertQuery, [username, email, password], (err, results) => {
      if (err) {
        console.error("Error inserting new member:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      res.status(201).json({ message: "Sign up successful" });
    });
  });
});

// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const loginQuery = "SELECT * FROM members WHERE email = ? AND password = ?";
  db.query(loginQuery, [email, password], (err, results) => {
    if (err) {
      console.error("Error checking login credentials:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful" });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
