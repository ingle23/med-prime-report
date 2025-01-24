import React from 'react'
import { useLocation } from 'react-router-dom';

export default function TechnicianDashboard() {
  const location = useLocation();
  const role = location.state?.role; 
  console.log(location)
  return (
    <>
    <div className="p-4 mt-5 bg-red-300 min-w-full mx-auto"><h1>{role} Panel </h1></div>
    <div className="flex flex-col w-full max-w-4xl mx-auto mt-8 p-6 content-center">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-sky-300 text-gray-600">
          <tr>
            <th scope="col" className="px-6 py-3 text-left font-semibold">
              Sr. No.
            </th>
            <th scope="col" className="px-6 py-3 text-left font-semibold">
              User Name
            </th>
            <th scope="col" className="px-6 py-3 text-left font-semibold">
              Role
            </th>
            <th scope="col" className="px-6 py-3 text-left font-semibold">
              Handle
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-neutral-200 hover:bg-gray-50 dark:border-white/10">
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
              1
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
              Mark
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
              Otto
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
              @mdo
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  )
}
