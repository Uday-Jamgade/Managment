

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CourseDetail = () => {
  const { Courseid } = useParams();
  
  const [courseDetail, setDetail] = useState([]);
  const [courseStudent, setStudent] = useState([]);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`https://managment-backend-5.onrender.com/api/v1/detail-course/${Courseid}`, { headers });
        setDetail(response.data.data);
        setStudent(response.data.students);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchdata();
  }, []);

  const deleteCourse = async (id) => {
    await axios.delete(`http://localhost:3000/api/v1/delete_course/${id}`, { headers });
    alert("Course is Deleted");
    navigate("/courses");
  };

  return (
    <div className="container mx-auto px-4 bg-gray-700 text-white min-h-screen">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">Course Detail</h1>

        <div className="flex justify-end m-5">
          <button
            onClick={() => navigate("/add-course", { state: { courseDetail } })}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Edit
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => deleteCourse(Courseid)}>
            Delete
          </button>
        </div>
      </div>

      <div className="bg-gray-900 shadow-md rounded flex flex-col items-center p-6 mb-6">

        <img src={courseDetail.imageurl} alt={courseDetail.name} className="w-60 h-70  object-cover rounded mb-4" />
        <h2 className="text-xl font-semibold">Course Name: {courseDetail.CourseName}</h2>
        <p className="text-gray-300">Description: {courseDetail.desc}</p>
        
        <p className="text-gray-300">Start Date: {courseDetail.start_Date}</p>
        <p className="text-gray-300">End Date: {courseDetail.end_Date}</p>
        <p className="text-lg font-semibold text-green-500">Price: ${courseDetail.price}</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Enrolled Students</h2>
      <div className="bg-gray-900 shadow-md rounded p-6">
        {courseStudent.length > 0 ? (
          <table className="w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-700 px-4 py-2">Profile</th>
                <th className="border border-gray-700 px-4 py-2">Name</th>
                <th className="border border-gray-700 px-4 py-2">Email</th>
                <th className="border border-gray-700 px-4 py-2">Phone</th>
              </tr>
            </thead>
            <tbody>
              {courseStudent.map((student) => (
                <tr key={student._id} onClick={()=>navigate(`/student/${student._id}`)} className="border border-gray-700 text-gray-300">
                  <td className="border border-gray-700 px-4 py-2">
                    <img src={student.imageurl} alt="Profile" className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="border border-gray-700 px-4 py-2">{student.studentname}</td>
                  <td className="border border-gray-700 px-4 py-2">{student.email}</td>
                  <td className="border border-gray-700 px-4 py-2">{student.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400">No students enrolled yet.</p>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;