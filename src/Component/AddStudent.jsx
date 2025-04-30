
import React, { useState ,useEffect} from 'react';
import axios from 'axios';

const AddStudent = () => {
  const [courselist,setCourselist] = useState([]);
  const [student, setStudent] = useState({
    studentname: '',
    phone: '',
    email: '',
    address: '',
    imageurl: '',
    // uid: '',
    Courseid: '',
  });
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };


  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/get-all-course', {headers});
        setCourselist(response.data.data);
        console.log(courselist);
        
       
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchdata();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
  
     const response =  await axios.post("http://localhost:3000/api/v1/add-student",student,{headers})
     console.log(response);

      console.log('Student Data:', student);
    alert('Student added successfully!');
    // Reset form fields
    setStudent({
      studentname: '',
      phone: '',
      email: '',
      address: '',
      imageurl: '',
      Courseid: '',
    });
    } catch (error) {
      console.log(Error);
      
    }
 
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Add Student</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="studentname" className="block text-gray-700 font-medium mb-2">
              Student Name
            </label>
            <input
              type="text"
              id="studentname"
              name="studentname"
              value={student.studentname}
              onChange={handleChange}
              className="w-full border text-gray-950 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter student name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={student.phone}
              onChange={handleChange}
              className="w-full border text-gray-950 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter phone number"
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
              value={student.email}
              onChange={handleChange}
              className="w-full border text-gray-950 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={student.address}
              onChange={handleChange}
              className="w-full border text-gray-950 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter address"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="imageurl" className="block text-gray-700 font-medium mb-2">
              Image URL (Optional)
            </label>
            <input
              type="text"
              id="imageurl"
              name="imageurl"
              value={student.imageurl}
              onChange={handleChange}
              className="w-full border text-gray-950 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter image URL"
            />
          </div>


<div className="mb-4">
  <label htmlFor="Courseid" className="block text-gray-700 font-medium mb-2">
    Course
  </label>
  <select
    id="Courseid"
    name="courseid"
    value={student.Courseid}
    onChange={handleChange}
    className="w-full border text-gray-950 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
  >
    {courselist.map((item,index)=>(
      <option key={item._id}  value={item._id}>{item.CourseName}</option>
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