import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const [message, setMessage] = useState('');
  // const [role, setRole] = useState('');
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
        
        // setRole(response.data.role)
        const role = response.data.role
        setMessage(response.data.msg);
        if(role == 'Admin'){
          navigate('/admindashboard',{ state: { role : role } });
        }
        else if(role == 'Doctor'){
          navigate('/doctordashboard', { state: { role : role  } });
        }
        else {
          navigate('/techniciandashboard',{ state: { role : role  } })
        }
        
       
      } catch (error) {
        console.error("Error accessing protected route:", error);
        setMessage('Invalid token');
        console.log("token error")
        navigate('/');  
      }
    };
  fetchData();
  }, [token, navigate]); 

  return (
    <div>{message}
    {/* <p>Role : {role}</p> */}
    </div>
  )
};

export default ProtectedRoute;
