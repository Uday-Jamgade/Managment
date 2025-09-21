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
        
        const response = await axios.get('https://managment-backend-5.onrender.com/api/v1/get-all-course', { headers });
        setCourse(response.data.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchdata();
  }, []);
 console.log(course);
 
        

  return (
    <div>
      <h1 className=' text-3xl font-bold text-center text-white mb-6'>Courses</h1>
    <div className=" grid grid-cols-4 w-full bg-grey-800  gap-6">
      
      {course.map((item, index) => (
        <div
          key={index}
          className="border-3 bg-cyan-950 border-gray-200 text-gray-300 rounded-lg shadow-md p-4  w-70 hover:shadow-lg transition-shadow"
          onClick={()=>navigate(`/course/${item._id}`)}
        >
          {/* Course Image */}
          <img
            src={item.imageurl || 'https://via.placeholder.com/300x200'}
            alt={item.title || 'Course Image'}
            className="w-full h-40  object-cover rounded-md mb-4"
          />
          {/* Course Name */}
          <h3 className="text-lg font-semibold text-gray-300">{item.CourseName || 'Course Name'}</h3>
          {/* Course Description */}
          <p className="text-gray-300 mt-2">{item.desc.slice(0,100) || 'Course Description'}...</p>
          <small className="text-gray-300 block mt-4">Price: {item.price || 'N/A'}</small>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Course;