const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;
const FILE = "./employee.json";

// GET all employees
app.get("/employees", (req, res) => {
  const data = fs.readFileSync(FILE);
  res.json(JSON.parse(data));
});

// ADD employee
app.post("/employees", (req, res) => {
  const employees = JSON.parse(fs.readFileSync(FILE));
  employees.push(req.body);
  fs.writeFileSync(FILE, JSON.stringify(employees, null, 2));
  res.send("Employee Added");
});
// how to : node server.js 
// DELETE employee
app.delete("/employees/:id", (req, res) => {
  let employees = JSON.parse(fs.readFileSync(FILE));
  employees = employees.filter(emp => emp.id != req.params.id);
  fs.writeFileSync(FILE, JSON.stringify(employees, null, 2));
  res.send("Employee Deleted");
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
