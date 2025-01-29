import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

function AddPtaientDetails() {
  const location = useLocation();
  const role = location.state?.role;
//   console.log(location);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.Age) {
      data.Age = parseInt(data.Age, 10);
    }
    const url = "http://127.0.0.1:5000/addpatient";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const responce = await fetch(url, options);
    reset();
    navigate("/techniciandashboard");
  };
  return (
    <>
      {role && role !== "Technician" && role !== "Doctor" ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg font-semibold text-gray-700 bg-yellow-200 p-4 rounded-md shadow-md">
            Please log in.
          </p>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-101"
            >
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Patient Details 
              </h2>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  {...register("Name", { required: "Name is required" })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Age Field */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  {...register("Age", {
                    required: "Age is required",
                    min: { value: 1, message: "Age must be at least 1" },
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
                {errors.age && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.age.message}
                  </p>
                )}
              </div>

              {/* Gender Field */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  {...register("Gender", { required: "Gender is required" })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Contact Number Field */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Contact Number
                </label>
                <input
                  type="text"
                  {...register("contactNumber", {
                    required: "Contact number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Contact number must be 10 digits",
                    },
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contactNumber.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="text"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
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

export default AddPtaientDetails;
