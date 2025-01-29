import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function DoctorDashboard() {
  const [Data, setData] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  const role = location.state?.role;
  // console.log(location);

  const handleonclick = () => {
    navigate("/addreportdata", { state: { role : role } });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://127.0.0.1:5000/getpatientdata");
      const data = await response.json();
      setData(data.result);
    };
    fetchData();
  }, []);

  return (
    // <>
    //   <div className="p-4 mt-5 bg-red-300 min-w-full mx-auto">
    //     <h1>{role} Panel </h1>
    //   </div>
    //   <div className="p-6">
    //     <div className="mb-4">
    //       <h2 className="text-2xl font-semibold">Patient Details:</h2>
    //     </div>
    //     <div>
    //       {Data.map((patient, index) => {
    //         return (
    //           <div
    //             key={index}
    //             className="mb-6 p-4 border border-gray-300 rounded-lg"
    //           >
    //             <ul>
    //               <li className="text-sm font-semibold text-gray-800">
    //                 <strong>Name:</strong> {patient.Name}
    //               </li>
    //               <li className="text-sm text-gray-700">
    //                 <strong>Age:</strong> {patient.Age}
    //               </li>
    //               <li className="text-sm text-gray-700">
    //                 <strong>Gender:</strong> {patient.Gender}
    //               </li>
    //               <li className="text-sm text-gray-700">
    //                 <strong>Contact Number:</strong> {patient.contactNumber}
    //               </li>
    //               <li className="text-sm text-gray-700">
    //                 <strong>Report(s):</strong>
    //                 <ul className="ml-4">
    //                   {patient.reports.map((report, reportIndex) => {
    //                     return (
    //                       <li
    //                         key={reportIndex}
    //                         className="mb-4 p-4 border border-gray-200 rounded-lg shadow-sm"
    //                       >
    //                         <ul>
    //                           <li className="text-sm text-gray-800">
    //                             <strong>Report ID:</strong> {report.reportId}
    //                           </li>
    //                           <li className="text-sm text-gray-700">
    //                             <strong>Description:</strong>{" "}
    //                             {report.description}
    //                           </li>
    //                           <li className="text-sm text-gray-700">
    //                             <strong>Weight:</strong> {report.weight}
    //                           </li>
    //                           <li className="text-sm text-gray-700">
    //                             <strong>Dimensions:</strong> {report.dimensions}
    //                           </li>
    //                           <li className="text-sm text-gray-700">
    //                             <strong>Report Details:</strong>{" "}
    //                             {report.reportDetails}
    //                           </li>
    //                         </ul>
    //                         <div className="mt-2">
    //                           <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
    //                             Delete
    //                           </button>
    //                           <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ml-2">
    //                             Edit
    //                           </button>
    //                         </div>
    //                       </li>
    //                     );
    //                   })}
    //                 </ul>
    //               </li>
    //             </ul>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </div>

    //   <br />
    //   <hr />
    // </>
    <>
      {role !== "Doctor" ? (
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
                Add Report
              </button>
            </div>
            {Data.map((patient, index) => (
              <div
                key={index}
                className="mb-6 p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                <ul>
                  <li className="text-lg font-semibold text-gray-800">
                    <strong>Name:</strong> {patient.Name}
                  </li>
                  <li className="text-sm text-gray-700">
                    <strong>Age:</strong> {patient.Age}
                  </li>
                  <li className="text-sm text-gray-700">
                    <strong>Gender:</strong> {patient.Gender}
                  </li>
                  <li className="text-sm text-gray-700">
                    <strong>Contact Number:</strong> {patient.contactNumber}
                  </li>
                  <button
                    type="submit"
                    onClick={handleonclick}
                    className="bg-blue-500 text-white mt-1 px-2 py-1 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  >
                    New Report
                  </button>
                  <li className="text-sm text-gray-700 mt-3">
                    <strong className="block mb-2">Report(s):</strong>
                    <ul className="ml-4 space-y-4">
                      {patient.reports.map((report, reportIndex) => (
                        <li
                          key={reportIndex}
                          className="p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
                        >
                          <ul>
                            <li className="text-sm text-gray-800">
                              <strong>Report ID:</strong> {report.reportId}
                            </li>
                            <li className="text-sm text-gray-700">
                              <strong>Description:</strong> {report.description}
                            </li>
                            <li className="text-sm text-gray-700">
                              <strong>Weight:</strong> {report.weight}
                            </li>
                            <li className="text-sm text-gray-700">
                              <strong>Dimensions:</strong> {report.dimensions}
                            </li>
                            <li className="text-sm text-gray-700">
                              <strong>Report Details:</strong>{" "}
                              {report.reportDetails}
                            </li>
                          </ul>
                          <div className="mt-4 flex space-x-4">
                            <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-200">
                              Delete
                            </button>
                            <button className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition-colors duration-200">
                              Edit
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            ))}
          </div>
          <br />
          <hr />
        </>
      )}
    </>
  );
}

export default DoctorDashboard;
