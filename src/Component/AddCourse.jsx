
import React, { useState } from 'react';
import axios from 'axios'

const AddCourse = () => {

  const headers={
    id: localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}` ,
  }

  const [course, setCourse] = useState({
    CourseName: '',
    price: '',
    desc: '',
    start_Date: '',
    end_Date: '',
    imageurl: '',
    // uid: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/v1/add_course",course,{headers});
            console.log(response.data)

      console.log('Course Data:', course);
      alert('Course added successfully!');
      // Reset the form fields
      // setCourse({
      //   CourseName: '',
      //   price: '',
      //   desc: '',
      //   start_Date: '',
      //   end_Date: '',
      //   imageurl: '',
      //   uid: '',
      // });
    } catch (error) {
      console.log(error);
      
    }
    // console.log('Course Data:', course);
    // alert('Course added successfully!');
    // // Reset the form fields
    // setCourse({
    //   CourseName: '',
    //   price: '',
    //   desc: '',
    //   start_Date: '',
    //   end_Date: '',
    //   imageurl: '',
    //   uid: '',
    // });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Add Course</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="CourseName" className="block text-gray-700 font-medium mb-2">
              Course Name
            </label>
            <input
              type="text"
              id="CourseName"
              name="CourseName"
              value={course.CourseName}
              onChange={handleChange}
              className="w-full border  text-gray-950 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter course name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={course.price}
              onChange={handleChange}
              className="w-full border  text-gray-950 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter course price"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="desc" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              id="desc"
              name="desc"
              value={course.desc}
              onChange={handleChange}
              className="w-full border  text-gray-950 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter course description"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="start_Date" className="block text-gray-700 font-medium mb-2">
              Start Date
            </label>
            <input
              type="date"
              id="start_Date"
              name="start_Date"
              value={course.start_Date}
              onChange={handleChange}
              className="w-full border  text-gray-950 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="end_Date" className="block text-gray-700 font-medium mb-2">
              End Date
            </label>
            <input
              type="date"
              id="end_Date"
              name="end_Date"
              value={course.end_Date}
              onChange={handleChange}
              className="w-full border  text-gray-950 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="imageurl" className="block text-gray-700 font-medium mb-2">
              Image URL
            </label>
            <input
              type="text"
              id="imageurl"
              name="imageurl"
              value={course.imageurl}
              onChange={handleChange}
              className="w-full border  text-gray-950 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter course image URL"
              required
            />
          </div>

          {/* {<div className="mb-4">
            <label htmlFor="uid" className="block text-gray-700 font-medium mb-2">
              UID (Optional)
            </label>
            <input
              type="text"
              id="uid"
              name="uid"
              value={course.uid}
              onChange={handleChange}
              className="w-full border  text-gray-950 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter UID (optional)"
            />
          </div>} */}

          <button
            type="submit"
            className="w-full  bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
