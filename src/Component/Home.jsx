
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [Data, setData] = useState([]);
  const navigate = useNavigate();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("https://managment-backend-5.onrender.com/api/v1/Home", { headers });
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchdata();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <header className="text-center py-20 bg-blue-500">
        <h2 className="text-4xl font-bold">Welcome to the Institute Management System</h2>
        <p className="mt-4 text-lg">Manage students, courses, and payments efficiently.</p>
      </header>

      {/* Stats Section */}
      <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div onClick={()=>navigate("/students")} className="p-15 bg-red-300 rounded-lg shadow-md text-center">
          <h3 className="text-3xl text-black font-bold">Total Students</h3>
          <p className="text-gray-700 font-bold text-xl">{Data.Totalstudent}</p>
        </div>
        <div onClick={()=>navigate("/courses")} className="p-15 bg-orange-300 rounded-lg shadow-md text-center">
          <h3 className="text-3xl text-black font-bold">Total Courses</h3>
          <p className="text-gray-700 font-bold text-xl">{Data.course}</p>
        </div>
        <div onClick={()=>navigate("/fee")} className="p-15 bg-green-300 rounded-lg shadow-md text-center">
          <h3 className="text-3xl text-black font-bold">Total Revenue</h3>
          <p className="text-gray-700 font-bold text-xl">{Data.amount?.[0]?.total || "Not Available"}</p>
        </div>
      </div>

      {/* Tables Section */}
      <div className="flex flex-col md:flex-row gap-6 p-6">
        {/* Student Table */}
        <div className="flex-1 p-4 bg-indigo-500 shadow-md rounded-lg">
          <h2 className="text-2xl text-black font-bold mb-4">Recent Students</h2>
          <table className="w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border border-gray-700 p-2">Profile</th>
                <th className="border border-gray-700 p-2">Name</th>
                <th className="border border-gray-700 p-2">Email</th>
                <th className="border border-gray-700 p-2">Phone</th>
              </tr>
            </thead>
            <tbody>
              {Data.Student?.map((student, index) => (
                <tr key={index} className="text-center bg-gray-700">
                  <td className="border border-gray-600 p-2">
                    <img src={student.imageurl} alt="Profile" className="w-10 h-10 rounded-full mx-auto" />
                  </td>
                  <td className="border border-gray-600 p-2">{student.studentname}</td>
                  <td className="border border-gray-600 p-2">{student.email}</td>
                  <td className="border border-gray-600 p-2">{student.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment Table */}
        <div className="flex-1 p-4 bg-violet-400 shadow-md rounded-lg">
          <h2 className="text-2xl text-black font-bold mb-4">Recent Payment </h2>
          <table className="w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border border-gray-700 p-2">Date</th>
                <th className="border border-gray-700 p-2">Student Name</th>
                <th className="border border-gray-700 p-2">Amount</th>
                <th className="border border-gray-700 p-2">Phone</th>
              </tr>
            </thead>
            <tbody>
              {Data.payment?.map((payment, index) => (
                <tr key={index} className="text-center bg-gray-700">
                  <td className="border border-gray-600 p-2">{payment.updatedAt}</td>
                  <td className="border border-gray-600 p-2">{payment.studentname}</td>
                  <td className="border border-gray-600 p-2">₹{payment.amount}</td>
                  <td className="border border-gray-600 p-2">{payment.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;