import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';



const Logout = () => {
    const token = localStorage.getItem('token'); 
  
    // const [message, setMessage] = useState("");
    const navigate = useNavigate()

    useEffect (() => {
        const logout = async() =>{
            if (!token) {
                console.error('No token found');
                return; // If there's no token, don't try to log out
            }
            try {
                const response = await axios.post('http://127.0.0.1:5000/logout',
                {},
                {
                  headers: { Authorization: `Bearer ${token}` },
                });
                localStorage.removeItem('token');
                navigate('/')
                // console.error('Logout Successfully Done..')
               
              } catch (error) {
                console.error('Logout failed');
              }
        }
        logout();
    },[token, navigate])

  return (
    <div></div>
  )
}


export default Logout;