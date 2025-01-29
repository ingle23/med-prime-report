import React, {useState,useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./component/Login";
import Register from "./component/Register";
import Logout from "./component/Logout";
import ProtectedRoute from "./component/Protected";
import AdminDashboard from "./dashboard/AdminDashboard";
import DoctorDashboard from "./dashboard/DoctorDashboard";
import TechnicianDashboard from "./dashboard/TechnicianDashboard";
import AddPtaientDetails from "./Report--Patient_data Add/AddPatientDetails";
import AddReportData from "./Report--Patient_data Add/AddReportData";
import "./App.css";



const App = () => {

  const [isAuthenticated,setIsAuthenticated] = useState(()=>{
    const savedAuthState = localStorage.getItem('isAuthenticated');
    return savedAuthState === 'true'; 
  });
    useEffect(() => {
      localStorage.setItem('isAuthenticated', isAuthenticated);
    }, [isAuthenticated]);


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setAuthentication={setIsAuthenticated}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout setAuthentication={setIsAuthenticated} />} />
          <Route path="/protected" element={ <ProtectedRoute >    </ProtectedRoute>}   />
          <Route path="/admindashboard" element={isAuthenticated ? <AdminDashboard /> : <Login setAuthentication={setIsAuthenticated} />} />
          <Route path="/doctordashboard" element={isAuthenticated ? <DoctorDashboard /> : <Login setAuthentication={setIsAuthenticated} />} />
          <Route path="/techniciandashboard" element={isAuthenticated ?<TechnicianDashboard /> : <Login setAuthentication={setIsAuthenticated} />} />
          <Route path="/addpatientdetails" element = {isAuthenticated ?<AddPtaientDetails />: <Login setAuthentication={setIsAuthenticated} />} />
          <Route path="/addreportdata" element = {isAuthenticated ?<AddReportData />: <Login setAuthentication={setIsAuthenticated} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
