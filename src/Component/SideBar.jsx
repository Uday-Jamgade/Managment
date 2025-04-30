import React, { useState } from 'react';
import { FaHome, FaUser, FaBook, FaMoneyBill, FaPlusSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SideBar = ({islogin}) => {
 

  return (
    <div className="h-screen bg-gray-800 text-white flex flex-col items-start px-4 py-8 w-64">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <nav>{!islogin ?<ul className="space-y-4">
        <li className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
            <FaHome />
            <Link to="/">Login</Link>
          </li>

          <li className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
            <FaPlusSquare />
            <Link to="/Signup">Sign up</Link>
          </li>

        </ul> : <ul className="space-y-4">


<li className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
  <FaHome />
  <Link to="/home">Home</Link>
</li>
<li className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
  <FaPlusSquare />
  <Link to="/add-course">Add Course</Link>
</li>
<li className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
  <FaBook />
  <Link to="/courses">Courses</Link>
</li>
<li className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
  <FaUser />
  <Link to="/add-student">Add Student</Link>
</li>
<li className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
  <FaUser />
  <Link to="/students">Students</Link>
</li>
<li className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
  <FaMoneyBill />
  <Link to="/add-fee">Add Fee</Link>
</li>
<li className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
  <FaMoneyBill />
  <Link to="/fee">Fee</Link>
</li>
</ul> }
        {/* <ul className="space-y-4">
        <li className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
            <FaHome />
            <Link to="/">Login</Link>
          </li>

          <li className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
            <FaPlusSquare />
            <Link to="/Signup">Sign up</Link>
          </li>

        </ul> */}
        {/* <ul className="space-y-4">


          <li className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
            <FaHome />
            <Link to="/home">Home</Link>
          </li>
          <li className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
            <FaPlusSquare />
            <Link to="/add-course">Add Course</Link>
          </li>
          <li className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
            <FaBook />
            <Link to="/courses">Courses</Link>
          </li>
          <li className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
            <FaUser />
            <Link to="/add-student">Add Student</Link>
          </li>
          <li className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
            <FaUser />
            <Link to="/students">Students</Link>
          </li>
          <li className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
            <FaMoneyBill />
            <Link to="/add-fee">Add Fee</Link>
          </li>
          <li className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
            <FaMoneyBill />
            <Link to="/fee">Fee</Link>
          </li>
        </ul> */}
      </nav>
    </div>
  );
};

export default SideBar;