import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

function AddReportData() {
  const location = useLocation();
  const role = location.state?.role;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.weight) {
      data.weight = parseFloat(data.weight);
    }

    const url = "http://127.0.0.1:5000/addreport";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const responce = await fetch(url, options);
    reset();
    navigate("/doctordashboard");
  };

  return (
    <>
      {role && role !== "Doctor" && role !== "Technician" ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg font-semibold text-gray-700 bg-yellow-200 p-4 rounded-md shadow-md">
            Please log in.
          </p>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-101">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
              Report Data
            </h2>
              {/* ReportId Field */}
              <div className="mb-6">
                <label
                  htmlFor="reportId"
                  className="block font-medium text-gray-700 mb-2"
                >
                  Report ID
                </label>
                <input
                  id="reportId"
                  type="text"
                  {...register("reportId")}
                  className={`border p-3 w-full rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 ${
                    errors.reportId ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.reportId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.reportId.message}
                  </p>
                )}
              </div>

              {/* Description Field */}
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  {...register("description")}
                  className={`border p-3 w-full rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Weight Field */}
              <div className="mb-6">
                <label
                  htmlFor="weight"
                  className="block font-medium text-gray-700 mb-2"
                >
                  Weight
                </label>
                <input
                  id="weight"
                  type="number"
                  step="any"
                  {...register("weight")}
                  className={`border p-3 w-full rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 ${
                    errors.weight ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.weight && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.weight.message}
                  </p>
                )}
              </div>

              {/* Dimensions Field */}
              <div className="mb-6">
                <label
                  htmlFor="dimensions"
                  className="block font-medium text-gray-700 mb-2"
                >
                  Dimensions (Optional)
                </label>
                <input
                  id="dimensions"
                  type="text"
                  {...register("dimensions")}
                  className={`border p-3 w-full rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 ${
                    errors.dimensions ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.dimensions && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dimensions.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105"
              >
                Submit
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default AddReportData;
