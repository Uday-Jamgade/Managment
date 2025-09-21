
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://managment-backend-5.onrender.com/api/v1/sign-in", formData);
      console.log(response.data);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/home")

      setFormData({ email: "", password: "" });
      setLogin(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center text-white">
      <div className="bg-gray-900 shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Email", id: "email", type: "email", value: formData.email },
            { label: "Password", id: "password", type: "password", value: formData.password },
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
             Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;