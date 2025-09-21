import { useState } from 'react'
import './App.css'


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './Component/SideBar';
import Home from './Component/Home';
import Fees from './Component/Fees';
import AddFees from './Component/AddFees';
import Student from './Component/Student';
// import Course from './Component/Course';
import AddCourse from './Component/AddCourse';
import AddStudent from './Component/AddStudent';
import Login from './Component/Login';
import Signup from './Component/Signup';
import CourseDetail from './Component/CourseDetail';
import StudentDetail from './Component/StudentDetail';
import Admin from './Component/Admin';
import { Suspense } from 'react';

const Course=React.lazy(()=>import('./Component/Course')) ;




const App = () => {
   const [islogin,setLogin]= useState(false)
   const login = (state)=>{
      setLogin(state)
   }
  return (
    <>
     <Router>
      <div className="flex">
        <SideBar islogin={islogin}/>
        <div className="h-screen w-310 p-8">
          <Routes>
            <Route path="/" element={<Login setLogin={login}/>}/>
            <Route path="/Signup" element={<Signup/>}/>
            <Route path="/home" element={<Home />} />
            <Route path="/add-course" element={<AddCourse />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/courses" element={ <Suspense fallback={<h1 style={{color:"red"}} >Loading...</h1>}><Course /></Suspense>} />
            <Route path="/students" element={<Student />} />
            <Route path="/add-fee" element={<AddFees />} />
            <Route path="/fee" element={<Fees/>} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="/course/:Courseid" element={<CourseDetail/>}/>
            <Route path="/student/:Studentid" element={<StudentDetail/>}/>

          </Routes>
        </div>
      </div>
    </Router>
    </>
   
  );
};

export default App;
