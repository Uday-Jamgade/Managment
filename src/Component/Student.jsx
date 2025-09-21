

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Student = () => {
  const [student, setStudent] = useState([]);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("https://managment-backend-5.onrender.com/api/v1/get-all-student", { headers });
        setStudent(response.data.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchdata();
  }, []);

  return (
    <div className="bg-black min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-white mb-6">Student List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {student.map((student) => (
          <div
            key={student._id}
            className="bg-gray-900 shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 flex items-center cursor-pointer"
            onClick={() => navigate(`/student/${student._id}`)}
          >
            {/* Circular Profile Image */}
            <img
              src={student.imageurl || "https://via.placeholder.com/150"}
              alt={student.studentname || "Student Profile"}
              className="w-20 h-20 object-cover rounded-full mr-4"
            />
            {/* Student Information */}
            <div className="text-white">
              <h2 className="text-xl font-bold">{student.studentname}</h2>
              <p className="text-gray-400">Phone: {student.phone}</p>
              <p className="text-gray-400">Address: {student.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Student;