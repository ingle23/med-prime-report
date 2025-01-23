import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); 
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/protected',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        });
        // const role = response.data.role
        console.log(response.data);
        console.log("Protected run ");
        setMessage(response.data.msg);
        // if(role == 'admin'){
        //   navigate('/admindashboard');
        // }
        // else if(role == 'doctor'){
        //   navigate('/doctordashboard')
        // }
        // else {
        //   navigate('/techniciandashboard')
        // }
        
       
      } catch (error) {
        console.error("Error accessing protected route:", error);
        setMessage('Invalid token');
        console.log("token error")
        navigate('/');  
      }
    };
  fetchData();
  }, [token, navigate]); 

  return <div><p>{message}</p></div>;
};

export default ProtectedRoute;
