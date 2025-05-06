import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Admin = () => {
    const [user,setUser]= useState([]);
    const navigate = useNavigate();

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
    
      const logout =(e)=>{
        e.preventDefault();
        localStorage.removeItem("id");
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        navigate("/");
      }

    useEffect(() => {
        const fetchdata = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/v1/get-user',{headers});
            setUser(response.data.data);
            console.log(response.data.data);
            
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchdata();
      }, []);
     

  return (
    <div className="w-250 h-100 mx-auto bg-teal-900 text-white shadow-md rounded-md p-6 flex mt-40 items-center">
        
      {/* Left Section: Admin Image */}
      <div className="w-3/9 flex justify-center">
        <img
          className="w-54 h-54 rounded-full object-cover"
          src={user.imageurl}
          alt="Admin"
        />
      </div>

      {/* Right Section: Admin Details */}
      <div className="w-2/3 pl-6">
      <h1 className="font-extrabold mb-6">ADMIN</h1>
        <div className="mb-4">
          <h3 className=" p-2 text-xl font-bold rounded-md">Admin Name :  {user.username}</h3>
        </div>
        <div className="mb-4">
          <h3 className="font-bold text-xl p-2 rounded-md"> Email :  {user.email}</h3>
        </div>
        <div className="mb-4">
          <h3 className=" font-bold text-xl p-2 rounded-md">Phone : {user.phone}</h3>
        </div>
        <div className="mb-4">
          <h3 className=" p-2 text-xl font-bold">Role :  {user.role}</h3>
        </div>
        <div className="flex justify-end">
        <button className="bg-red-500  text-white px-4 py-2 rounded" onClick={logout}> Logout </button>
        </div>
      
      </div>
    </div>
  );
};

export default Admin;