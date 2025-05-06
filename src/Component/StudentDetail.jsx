

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const StudentDetail = () => {
  const { Studentid } = useParams();
  const [detail, setDetail] = useState([]);
  const [payment,setPayment]=useState([])
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/get-studentdetail/${Studentid}`, { headers });
        setDetail(response.data.data);
        setPayment(response.data.payment);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchdata();
  }, []);

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:3000/api/v1/delete_student/${id}`, { headers });
    alert("Student has been deleted.");
    navigate("/students");
  };

  return (
    <div className="max-w-4xl my-32 mx-auto p-6 bg-zinc-400 text-white">
      <div className="bg-gray-900 shadow-md rounded-lg p-6">
        <div className="flex justify-end -mb-10 mt-5">
          <button
            onClick={() => navigate("/add-student", { state: { detail } })}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Edit
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => deleteStudent(Studentid)}>
            Delete
          </button>
        </div>

        <img src={detail.imageurl} alt="Student" className="w-32 h-32 rounded-full mx-auto mt-5" />
        <h2 className="text-2xl font-bold text-center mt-4">{detail.studentname}</h2>

        <div className="mt-6 space-y-4">
          {[
            { label: "Address", value: detail.address },
            { label: "Email", value: detail.email },
            { label: "Phone", value: detail.phone },
            { label: "Course", value: detail.Courseid },
          ].map((field, index) => (
            <p key={index} className="text-lg">
              <span className="font-semibold">{field.label}:</span> {field.value}
            </p>
          ))}
        </div>

        {/* Student Payment History */}
        <div className="mt-6">
          <h3 className="text-xl font-bold">Payment History</h3>
          <table className="w-full border-collapse mt-4 border border-gray-700">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-2 border border-gray-700">Date & Time</th>
                <th className="p-2 border border-gray-700">Amount</th>
                                <th className="p-2 border border-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {payment && payment.length > 0 ? (
                payment.map((payment, index) => (
                  <tr key={index} className="border border-gray-700">
                
                    <td className="p-2 border border-gray-700">{payment.createdAt}</td>
                    <td className="p-2 border border-gray-700">${payment.amount}</td>
                    <td className="p-2 border border-gray-700">{payment.remark}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-2 text-center text-gray-400">
                    No payment history available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;