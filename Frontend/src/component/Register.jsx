import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !role) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
        role,
      });
      setMessage("User registered successfully");
      
      navigate("/");
    } catch (error) {
      setMessage("Error: " + error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select a role</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
          <option value="technician">Technician</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
      <p>
        Already have an account? <Link to="/">Login here</Link>
      </p>
    </div>
  );
};



export default Register;
