import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role;

  const handlelogout = () => {
    navigate("/logout");
  };

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
      {role !== "Admin" ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg font-semibold text-gray-700 bg-yellow-200 p-4 rounded-md shadow-md">
            Please log in.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 flex justify-between items-center p-6 mt-5 bg-gradient-to-r from-red-500 to-pink-500 min-w-full max-w-7xl mx-auto rounded-lg shadow-2xl overflow-hidden">
            <h1 className="text-white text-3xl font-semibold">{role} Panel</h1>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={handlelogout}
            >
              Logout
            </button>
          </div>
          <div className="flex flex-col w-full max-w-7xl mx-auto mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
            <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
              <thead className="bg-sky-300 text-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left font-semibold text-sm uppercase tracking-wider"
                  >
                    Sr. No.
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left font-semibold text-sm uppercase tracking-wider"
                  >
                    User Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left font-semibold text-sm uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left font-semibold text-sm uppercase tracking-wider"
                  >
                    Handle
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    className="border-b border-neutral-200 hover:bg-gray-100 transition-all duration-300"
                    key={index}
                  >
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
      )}
    </>
  );
}
export default AdminDashboard;
