import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctUsername = "akhila";
    const correctPassword = "mypassword123";
    if (form.username === correctUsername && form.password === correctPassword) {
      localStorage.setItem("loggedIn", "true");
      navigate("/dashboard");
    } else alert("Invalid credentials!");
  };

  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      height: "100vh", background: "linear-gradient(135deg, #1976d2, #4caf50)"
    }}>
      <div className="container" style={{ maxWidth: "450px", textAlign: "center" }}>
        <h1>Welcome Back</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button type="submit" className="btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
