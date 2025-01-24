import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation,useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()
  const location = useLocation();
  const role = location.state?.role;

  const handlelogout = ()=>{
    navigate('/logout')
  }

  useEffect(() => {
    axios
        .get("http://localhost:5000/admin")
        .then((response) => {
          setUsers(response.data.users || []);
        })
        .catch((error) => console.error("Error fetching data:", error));
      }, []);
  // console.log(users);
  return (
    <>
      <div className="p-4 mt-5 bg-red-300 min-w-full max-w-7xl mx-auto flex flex-col">
  <h1 className="text-black text-2xl font-semibold">{role} Panel</h1>
  <button className="bg-gray-300 text-black p-3 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 w-fit" onClick={handlelogout}>
    Logout
  </button>
</div>

<div className="flex flex-col w-full max-w-7xl mx-auto mt-8 p-6">
  <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
    <thead className="bg-sky-300 text-gray-600">
      <tr>
        <th scope="col" className="px-6 py-3 text-left font-semibold text-sm">
          Sr. No.
        </th>
        <th scope="col" className="px-6 py-3 text-left font-semibold text-sm">
          User Name
        </th>
        <th scope="col" className="px-6 py-3 text-left font-semibold text-sm">
          Role
        </th>
        <th scope="col" className="px-6 py-3 text-left font-semibold text-sm">
          Handle
        </th>
      </tr>
    </thead>
    <tbody>
      {users.map((user,index) => (
        <tr className="border-b border-neutral-200 hover:bg-gray-50" key={index}>
        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
          {user[0]}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
          {user[1]}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
          {user[3]}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
          @mdo
        </td>
      </tr>
      ))}
    </tbody>
  </table>
</div>

    </>
  );
}
export default AdminDashboard;
