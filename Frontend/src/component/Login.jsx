import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = ({setAuthentication}) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthentication(true);

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      const token = response.data.access_token;
      const role = response.data.role;
      
      if (token) {
        localStorage.setItem("token", token);
        navigate("/protected");
      } else {
        setErrorMessage("Token not received. Please check the backend.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md  mr-20  mt-9 mb-9 ml-5 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleLogin} className="space-y-6 p-8">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            autoComplete="username"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </div>
      </form>

      {errorMessage && (
        <p className="mt-4 text-red-500 text-center text-sm">{errorMessage}</p>
      )}

      <p className="mt-4 text-center text-sm text-gray-600">
        Create an account?{" "}
        <Link to="/register" className="text-blue-600 hover:text-blue-700">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
