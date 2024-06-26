const express = require('express');
const fs = require('fs').promises; // Use fs.promises directly
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Use PORT environment variable or default to 5501

// CORS setup (allow requests from any origin)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Body parsing middleware
app.use(express.json());

// Endpoint to update employee data
app.post('/updateEmployee', async (req, res) => {
  const { body: newEmployeeData } = req;
  const filePath = path.join(__dirname, 'database', 'employees.json');

  try {
    // Read existing employees data
    const data = await fs.readFile(filePath, 'utf8');
    const employees = JSON.parse(data);

    // Add new employee data
    employees.push(newEmployeeData);

    // Write updated data back to file
    await fs.writeFile(filePath, JSON.stringify(employees, null, 2));
    
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
    // Read data file and parse JSON
    const data = await fs.readFile(filePath, 'utf8');
    const employees = JSON.parse(data);

    // Find user by first name
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

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
