const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.use(express.static(path.join(__dirname, "public")));

// Serve static files from the "src" and "public" directories
app.use("/src/styles", express.static(path.join(__dirname, "src/styles")));
app.use("/src/scripts", express.static(path.join(__dirname, "src/scripts")));
app.use("/src/pages", express.static(path.join(__dirname, "src/pages")));
app.use("/public/img", express.static(path.join(__dirname, "public/img")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

// Serve the index.html file from the root directory
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const membersFilePath = path.join(__dirname, "database", "members.json");

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  // Validate user input
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if the email is already registered
  const members = JSON.parse(fs.readFileSync(membersFilePath));
  const existingMember = members.find((member) => member.email === email);
  if (existingMember) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // Add the new member to the database
  const newMember = { username, email, password };
  members.push(newMember);
  fs.writeFileSync(membersFilePath, JSON.stringify(members, null, 2));

  res.status(201).json({ message: "Sign up successful" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
