import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      
      const token = response.data.access_token;
      const role = response.data.role;

      if (token) {
        localStorage.setItem('token', token);
        // navigate("/dashboard");
        navigate("/protected");
      if(role == 'admin'){
        navigate('/admindashboard');
      }
      else if(role == 'doctor'){
        navigate('/doctordashboard')
      }
      else {
        navigate('/techniciandashboard')
      }
        

      } else {
        setErrorMessage('Token not received. Please check the backend.');
      }
      
    } catch (error) {
      console.error(error);
      setErrorMessage('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label htmlFor='username'>
          Username : </label>
          <input
            type="text"
            id='username'
            name='username'
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            autoComplete="username"
            required
          />
      
        <br /><br />
        <label htmlFor='password'>
          Password:  </label>
          <input
            type="password"
            name='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password" 
            required
          />
       
        <br />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
       <p>
              Create an account? <Link to="/register">Register here</Link>
        </p>
    </div>
  );
};

export default Login;
