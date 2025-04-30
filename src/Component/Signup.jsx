import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'image') {
        const file = e.target.files[0]
        if(file){
            setFormData({ ...formData, [name]:  URL.createObjectURL(file)});  
        }
    //   setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
try {
  
  const response = await axios.post("http://localhost:3000/api/v1/sign-up",formData);
  console.log(response)
} catch (error) {
  console.log(error)
}
  
    // e.preventDefault();
    console.log('Form Data:', formData);
    alert('Signup successful!');
    // Clear form
    setFormData({
      username: '',
      email: '',
      password: '',
      phone: '',
      image: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-600 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700  font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none text-gray-950 focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300  text-gray-950 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300  text-gray-950 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300  text-gray-950 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
              Profile Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300  text-gray-950 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600   text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;