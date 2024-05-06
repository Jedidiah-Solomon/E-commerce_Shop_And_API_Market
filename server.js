const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5501;

// CORS setup (allow requests from specific origins)
const allowedOrigins = ['http://127.0.0.1:5501', 'http://localhost:5501'];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Body parsing middleware
app.use(express.json());

// Endpoint to update employee data
app.post('/updateEmployee', async (req, res) => {
  const newEmployeeData = req.body;
  const filePath = path.join(__dirname, 'database', 'employees.json');

  try {
    const employees = JSON.parse(await fs.promises.readFile(filePath, 'utf8'));
    employees.push(newEmployeeData);
    await fs.promises.writeFile(filePath, JSON.stringify(employees, null, 2));
    res.status(200).send('User added successfully');
  } catch (error) {
    console.error('Error updating employee data:', error);
    res.status(500).send('Failed to add user');
  }
});

// Endpoint to get a user by first name
app.get('/getUserByFirstName', async (req, res) => {
  const { firstName } = req.query;
  const filePath = path.join(__dirname, 'database', 'employees.json');

  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    const employees = JSON.parse(data);
    const user = employees.find(user => user.firstName === firstName);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error reading data file:', error);
    res.status(500).send('Failed to fetch user details');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
