
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      const file = e.target.files[0];
      if (file) {
        setFormData({ ...formData, [name]: URL.createObjectURL(file) });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/v1/sign-up", formData);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }

    console.log("Form Data:", formData);
    alert("Signup successful!");
    setFormData({
      username: "",
      email: "",
      password: "",
      phone: "",
      image: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center text-white">
      <div className="bg-gray-900 p-6 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Signup</h1>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Full Name", id: "username", type: "text", value: formData.username },
            { label: "Email", id: "email", type: "email", value: formData.email },
            { label: "Password", id: "password", type: "password", value: formData.password },
            { label: "Phone", id: "phone", type: "tel", value: formData.phone },
          ].map((field) => (
            <div className="mb-4" key={field.id}>
              <label htmlFor={field.id} className="block font-medium mb-2">{field.label}</label>
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                value={field.value}
                onChange={handleChange}
                className="w-full border bg-gray-700 text-white border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder={`Enter ${field.label.toLowerCase()}`}
                required
              />
            </div>
          ))}

          <div className="mb-4">
            <label htmlFor="image" className="block font-medium mb-2">Profile Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border bg-gray-700 text-white border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;