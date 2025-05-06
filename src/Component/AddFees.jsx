

import { useState, useEffect } from "react";
import axios from "axios";

const AddFees = () => {
  const [courselist, setCourselist] = useState([]);
  const [fees, setFees] = useState({
    studentname: "",
    phone: "",
    amount: "",
    remark: "",
    Courseid: ""
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/get-all-course", { headers });
        setCourselist(response.data.data);
        console.log(courselist);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchdata();
  }, []);

  const handleChange = (e) => {
    setFees({ ...fees, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/v1/add-fee", fees, { headers });
      console.log(response);
      alert("Fees submitted successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-grey-800 flex items-center justify-center text-white">
      <div className="bg-slate-600 shadow-lg rounded-lg p-6 max-w-150 w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Add Fees</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {/* <label htmlFor="studentname" className="block font-medium mb-2">Student Name</label> */}
            <input
              type="text"
              id="studentname"
              name="studentname"
              value={fees.studentname}
              onChange={handleChange}
              className="w-full border bg-gray-800 text-white border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter student name"
              required
            />
          </div>

          <div className="mb-4">
            {/* <label htmlFor="phone" className="block font-medium mb-2">Phone</label> */}
            <input
              type="text"
              id="phone"
              name="phone"
              value={fees.phone}
              onChange={handleChange}
              className="w-full border bg-gray-800 text-white border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="mb-4">
            {/* <label htmlFor="amount" className="block font-medium mb-2">Amount</label> */}
            <input
              type="text"
              id="amount"
              name="amount"
              value={fees.amount}
              onChange={handleChange}
              className="w-full border bg-gray-800 text-white border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter amount"
              required
            />
          </div>

          <div className="mb-4">
            {/* <label htmlFor="remark" className="block font-medium mb-2">Remark</label> */}
            {/* <input
              type="text"
              id="remark"
              name="remark"
              value={fees.remark}
              onChange={handleChange}
              className="w-full border bg-gray-800 text-white border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter remarks"
            /> */}

            <select 
             name="remark"
             id="remark"
             value={fees.remark}
             onChange={handleChange}
              className="w-full border bg-gray-800 text-white border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
             >
              <option value="" >Select Status</option>
              <option value="Incomplete">Incomplete</option>
              <option value="Complete">Complete</option>
             
             </select>
          </div>

          <div className="mb-4">
            {/* <label htmlFor="Courseid" className="block font-medium mb-2">Course</label> */}
            <select
              id="Courseid"
              name="Courseid"
              value={fees.Courseid}
              onChange={handleChange}
              className="w-full border bg-gray-800 text-white border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
            <option >Select Cousrse</option>
              {courselist.map((item) => (
                <option key={item._id} value={item._id}>{item.CourseName}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Add Fees
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFees;