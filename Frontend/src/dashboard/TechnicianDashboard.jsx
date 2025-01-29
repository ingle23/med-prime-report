import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function TechnicianDashboard() {
  const [Data, setData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role;
  // console.log(location);

  const handleonclick = () => {
    navigate("/addpatientdetails",{ state: { role : role } });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://127.0.0.1:5000/getreportdata");
      const data = await response.json();
      setData(data.result);
    };
    fetchData();
  }, []);

  return (
    <>
      {role !== "Technician" ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg font-semibold text-gray-700 bg-yellow-200 p-4 rounded-md shadow-md">
            Please log in.
          </p>
        </div>
      ) : (
        <>
          <div className="p-4 mt-5 bg-gradient-to-r from-red-500 to-pink-500 min-w-full mx-auto text-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold">{role} Panel</h1>
          </div>

          <div className="p-6 bg-gray-50 min-w-full mx-auto rounded-lg shadow-md">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                Patient Details:
              </h2>
              <button
                type="submit"
                onClick={handleonclick}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              >
                Add Patient Info
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                  <tr className="text-gray-700">
                    <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      Name
                    </th>
                    <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      Age
                    </th>
                    <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      Contact Number
                    </th>
                    <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      Report ID
                    </th>
                    <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Data.map((data, index) => (
                    <tr
                      key={index}
                      className={`odd:bg-gray-50 even:bg-gray-100 transition-all duration-300 hover:bg-gray-200`}
                    >
                      <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700">
                        {data.Name}
                      </td>
                      <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700">
                        {data.Age}
                      </td>
                      <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700">
                        {data.Gender}
                      </td>
                      <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700">
                        {data.contactNumber}
                      </td>
                      <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700">
                        {data.reportId}
                      </td>
                      <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700 flex space-x-2">
                        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                          Delete
                        </button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}
