
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const AddCourse = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [course, setCourse] = useState({
    CourseName: '',
    price: '',
    desc: '',
    start_Date: '',
    end_Date: '',
    imageurl: '',
  });

  useEffect(() => {
    if (location.state) {
      setCourse({
        CourseName: location.state.courseDetail.CourseName,
        price: location.state.courseDetail.price,
        desc: location.state.courseDetail.desc,
        start_Date: location.state.courseDetail.start_Date,
        end_Date: location.state.courseDetail.end_Date,
        imageurl: location.state.courseDetail.imageurl,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!location.state) {
        await axios.post("https://managment-backend-5.onrender.com/api/v1/add_course", course, { headers });
        alert('Course added successfully!');
      setCourse({
    CourseName: '',
    price: '',
    desc: '',
    start_Date: '',
    end_Date: '',
    imageurl: '',
      })

      } else {
        await axios.put(`https://managment-backend-5.onrender.com/api/v1/update_course/${location.state.courseDetail._id}`, course, { headers });
        alert("Course Updated Successfully!")
        navigate(`/course/${location.state.courseDetail._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen  bg-grey-800 flex items-center justify-center text-white">
      <div className="bg-slate-600 shadow-lg rounded-lg p-6 max-w-150 w-full">
        <h1 className="text-2xl font-bold text-center mb-6">
          {location.state ? 'Edit Course' : 'Add Course'}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {/* <label htmlFor="CourseName" className="block font-medium mb-2">Course Name</label> */}
            <input
              type="text"
              id="CourseName"
              name="CourseName"
              value={course.CourseName}
              onChange={handleChange}
              className="w-full  bg-gray-800 text-white border-3 border-gray-800 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter course name"
              required
            />
          </div>

          <div className="mb-4">
            {/* <label htmlFor="price" className="block font-medium mb-2">Price</label> */}
            <input
              type="text"
              id="price"
              name="price"
              value={course.price}
              onChange={handleChange}
              className="w-full  bg-gray-800 text-white border-3 border-gray-800 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter course price"
              required
            />
          </div>

          <div className="mb-4">
            {/* <label htmlFor="desc" className="block font-medium mb-2">Description</label> */}
            <textarea
              id="desc"
              name="desc"
              value={course.desc}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border-3 border-gray-800 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter course description"
              required
            />
          </div>

          <div className="mb-4">
            {/* <label htmlFor="start_Date" className="block font-medium mb-2">Start Date</label> */}
            <input
              type="date"
              id="start_Date"
              name="start_Date"
              value={course.start_Date}
              onChange={handleChange}
              className="w-full  bg-gray-800 text-white border-3 border-gray-800 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div className="mb-4">
            {/* <label htmlFor="end_Date" className="block font-medium mb-2">End Date</label> */}
            <input
              type="date"
              id="end_Date"
              name="end_Date"
              value={course.end_Date}
              onChange={handleChange}
              className="w-full  bg-gray-800 text-white border-3 border-gray-800 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div className="mb-4">
            {/* <label htmlFor="imageurl" className="block font-medium mb-2">Image URL</label> */}
            <input
              type="text"
              id="imageurl"
              name="imageurl"
              value={course.imageurl}
              onChange={handleChange}
              className="w-full border bg-gray-800 text-white border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter course image URL"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {location.state ? 'Update Course' : 'Add Course'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;