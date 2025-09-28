// src/pages/AddCustomer.js
import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

function AddCustomer() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/customers/add/", form);
      alert("Customer added successfully!");
      setForm({ name: "", email: "", phone: "" });
    } catch (err) {
      alert("Error adding customer!");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Add Customer</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <button type="submit" className="btn-primary">Add Customer</button>
      </form>
    </div>
  );
}

export default AddCustomer;
