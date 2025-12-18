import React, { useState, useEffect } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", role: "", salary: "" });
  const [isEdit, setIsEdit] = useState(false);

  // Fetch employees
  useEffect(() => {
    fetch("http://localhost:5000/employees")
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update employee
  const saveEmployee = () => {
    if (isEdit) {
      // UPDATE (frontend only)
      setEmployees(
        employees.map(emp =>
          emp.id === form.id ? form : emp
        )
      );
      setIsEdit(false);
    } else {
      // ADD
      const newEmp = { ...form, id: Date.now() };

      fetch("http://localhost:5000/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmp)
      });

      setEmployees([...employees, newEmp]);
    }

    setForm({ id: "", name: "", role: "", salary: "" });
  };

  // Edit employee
  const editEmployee = (emp) => {
    setForm(emp);
    setIsEdit(true);
  };

  // Delete employee
  const deleteEmployee = (id) => {
    fetch(`http://localhost:5000/employees/${id}`, {
      method: "DELETE"
    });

    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee Management System</h2>

      {/* FORM */}
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="role" placeholder="Role" value={form.role} onChange={handleChange} />
      <input name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} />
      <button onClick={saveEmployee}>
        {isEdit ? "Update" : "Add"}
      </button>

      <br /><br />

      {/* TABLE */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.role}</td>
              <td>₹{emp.salary}</td>
              <td>
                <button onClick={() => editEmployee(emp)}>Edit</button>
                <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;
