import React, { useState,useEffect } from 'react';
import axios from 'axios';


const Student = () => {

  const [student,setStudent]=useState([])

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

    useEffect(() => {
      const fetchdata = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/v1/get-all-student', { headers });
          setStudent(response.data.data)
          console.log(response);
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchdata();
    },[]);


  return (
    <div>
    <div className="bg-gray-600 h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Student List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {student.map((student) => (
          <div
            key={student._id}
            className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 flex items-center"
          >
            {/* Circular Profile Image */}
            <img
              src={student.imageurl || 'https://via.placeholder.com/150'}
              alt={student.studentname || 'Student Profile'}
              className="w-20 h-20 object-cover rounded-full mr-4"
            />
            {/* Student Information */}
            <div>
              <h2 className="text-xl font-bold text-blue-700">{student.studentname}</h2>
              <p className="text-gray-600">Phone: {student.phone}</p>
              <p className="text-gray-600">Address: {student.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default Student

