// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from "./component/Login";
// import Register from "./component/Register";
// import ProtectedRoute from "./component/Protected";
// import "./App.css";

// function App() {

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//         <Route path="/" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           {/* <Route path="/protected" element={ <ProtectedRoute> <ProtectedPage /></ProtectedRoute> } /> */}
//           <Route path="/protected" element={<ProtectedRoute />}>
//             <Route path="/protected" element={<ProtectedPage />} /> {/* Nested route for protected page */}
//           </Route>



//           {/* <Route exact path="/" component={Login} />
//           <Route path="/register" component={Register} />
//           <ProtectedRoute path="/protected" component={ProtectedPage} /> */}
//         </Routes>
        
//       </div>
//     </Router>
//   );
// }

// const ProtectedPage = () => {
//   return <div>This is a protected page for logged-in users</div>;
// };


// export default App;

// ====================================================================================================================



// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const token = localStorage.getItem('token');

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         token ? <Component {...props} /> : <Navigate to="/" />
//       }
//     />
    
//   ); 
// };

// export default ProtectedRoute;

// ============================================================================================

// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const TokenRoute = () => {
//   const token = localStorage.getItem('token');
//   console.log("Get Token",token)
   
//   // If there is no token, redirect to the login page
//   if (!token) {
//     return <Navigate to="/" />;
//   }

//   // If there is a token, render the provided component
//   return <Navigate to="/home" />;
// };

// export default TokenRoute;

// ======================================================================================================

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import * as jwt_decode from "jwt-decode";
// import { Link, useNavigate } from "react-router-dom";

// const Login = ({login}) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();


//   const handleSubmit = async (e) => {
//     e.preventDefault();
   

//     try {
//       const response = await axios.post("http://localhost:5000/login", {
//         username,
//         password,
//       });
      
//       const token = response.data.access_token;
//       // localStorage.setItem("token", token);
//       // navigate("/protected")
//       // login(token)


//       // localStorage.setItem("token", token);
//       // localStorage.setItem('user', JSON.stringify(user));
//       // console.log("SET Token :", token)
      

//       // const decoded = jwt_decode(token);
//       // console.log("Done ")
//       // setMessage(`Logged in as ${decoded.role}`);
      
      

//       // Redirect to protected page or home page
//       // navigate("/protected");
//     } 
//     catch (error) {
//       setMessage("Invalid credentials");
//       setUsername("");
//       setPassword("");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit} > 
//         <input
//           type="text"
//           name="username"
//           id="username"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           name="password"
//           id="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//       <p>{message}</p>
//       <p>
//         Don't have an account? <Link to="/register">Register here</Link>
//       </p>
//     </div>
//   );
// };

// // function Login() {
// //   return (
// //     <div>Login</div>
// //   )
// // }

// export default Login;

// ====================================== PROTECTED ROUTE ========================================

// @app.route('/protected', methods=['GET'])
// @jwt_required()
// def protected():
//     current_user = get_jwt_identity()
//     role = current_user['role']
//     if role == 'admin':
//         return jsonify({"msg": "Admin access granted"})
//     elif role == 'doctor':
//         return jsonify({"msg": "Doctor access granted"})
//     elif role == 'technician':
//         return jsonify({"msg": "Technician access granted"})
//     else:
//         return jsonify({"msg": "Unauthorized"}), 403