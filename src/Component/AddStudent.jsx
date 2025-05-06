
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AddStudent = () => {
  const [courselist, setCourselist] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    studentname: "",
    phone: "",
    email: "",
    address: "",
    imageurl: "",
    Courseid: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    if (location.state) {
      setStudent({
        studentname: location.state.detail.studentname,
        phone: location.state.detail.phone,
        email: location.state.detail.email,
        address: location.state.detail.address,
        imageurl: location.state.detail.imageurl,
        Courseid: location.state.detail.Courseid,
      });
    }
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/get-all-course", { headers });
        setCourselist(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchdata();
  }, []);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!location.state) {
        await axios.post("http://localhost:3000/api/v1/add-student", student, { headers });
        alert("Student added successfully!");
        setStudent({
          studentname: "",
          phone: "",
          email: "",
          address: "",
          imageurl: "",
          Courseid: "",
        });
      } else {
        await axios.put(`http://localhost:3000/api/v1/update_student/${location.state.detail._id}`, student, { headers });
        alert("Student updated successfully!");
        navigate(`/student/${location.state.detail._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-grey-800 flex items-center justify-center text-white">
      <div className="bg-slate-600 shadow-lg rounded-lg p-6 max-w-150 w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Add Student</h1>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Student Name", id: "studentname", type: "text", value: student.studentname },
            { label: "Phone", id: "phone", type: "text", value: student.phone },
            { label: "Email", id: "email", type: "email", value: student.email },
            { label: "Address", id: "address", type: "text", value: student.address },
            { label: "Image URL", id: "imageurl", type: "text", value: student.imageurl },
          ].map((field) => (
            <div className="mb-4" key={field.id}>
              {/* <label htmlFor={field.id} className="block font-medium mb-2">{field.label}</label> */}
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                value={field.value}
                onChange={handleChange}
                className="w-full border bg-gray-800 text-white border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder={`Enter ${field.label.toLowerCase()}`}
                required={field.id !== "imageurl"}
              />
            </div>
          ))}

          <div className="mb-4">
            {/* <label htmlFor="Courseid" className="block font-medium mb-2">Course</label> */}
            <select
              id="Courseid"
              name="Courseid"
              value={student.Courseid}
              onChange={handleChange}
              className="w-full border bg-gray-800 text-white border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {courselist.map((item) => (
                <option key={item._id} value={item._id}>{item.CourseName}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;