import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = ({ setAuthentication }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    const logout = async () => {
      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/logout",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        localStorage.removeItem("token");
        setAuthentication(false);
        navigate("/");
      } catch (error) {
        console.error("Logout failed", error);
      }
    };
    logout();
  }, [navigate, setAuthentication]);

  return <div></div>;
};

export default Logout;
