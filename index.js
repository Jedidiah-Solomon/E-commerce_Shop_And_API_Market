const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

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
