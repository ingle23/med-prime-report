import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./component/Login";
import Register from "./component/Register";
import Logout from "./component/Logout";
import ProtectedRoute from "./component/Protected";
import AdminDashboard from "./dashboard/AdminDashboard";
import DoctorDashboard from "./dashboard/DoctorDashboard";
import TechnicianDashboard from "./dashboard/TechnicianDashboard";
import "./App.css";



const App = () => {
  
  const ProtectedPage = () => {
      return <div>This is a protected page for logged-in users</div>;
    };


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/protected" element={ <ProtectedRoute >    </ProtectedRoute>}   />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/doctordashboard" element={<DoctorDashboard />} />
          <Route path="/techniciandashboard" element={<TechnicianDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
