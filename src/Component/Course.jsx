import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Course = () => {
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/get-all-course', { headers });
        setCourse(response.data.data);
        console.log(course);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchdata();
  }, []);

  return (
    <div className="p-6 flex flex-wrap gap-6">
      {course.map((item, index) => (
        <div
          key={index}
          className="border border-gray-300 text-gray-300 rounded-lg shadow-md p-4 w-72 hover:shadow-lg transition-shadow"
          onClick={()=>navigate(`course/${item._id}`)}
        >
          {/* Course Image */}
          <img
            src={item.image || 'https://via.placeholder.com/300x200'}
            alt={item.title || 'Course Image'}
            className="w-full h-40  object-cover rounded-md mb-4"
          />
          {/* Course Name */}
          <h3 className="text-lg font-semibold text-gray-300">{item.CourseName || 'Course Name'}</h3>
          {/* Course Description */}
          <p className="text-gray-300 mt-2">{item.desc || 'Course Description'}</p>
          <small className="text-gray-300 block mt-4">Instructor: {item.instructor || 'N/A'}</small>
        </div>
      ))}
    </div>
  );
};

export default Course;