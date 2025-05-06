import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Fees = () => {
  const [payments , setPayments]= useState([])

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(()=>{
    const fetchdata = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/payment-history', { headers });
        console.log(response.data.data);
        setPayments(response.data.data)
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchdata();
    
  },[setPayments])

  

  
  
  return (
    <div className="bg-grey-800 text-white p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Payment History</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-2 border border-gray-700">Name</th>
            <th className="p-2 border border-gray-700">Phone</th>
            <th className="p-2 border border-gray-700">Amount</th>
            <th className="p-2 border border-gray-700">Remark</th>
          </tr>
        </thead>
        <tbody>
        {payments.map((payment, index) => (
            <tr key={index} className="border border-gray-700">
              <td className="p-2 border border-gray-700">{payment.studentname}</td>
              <td className="p-2 border border-gray-700">{payment.phone}</td>
              <td className="p-2 border border-gray-700">{payment.amount}</td>
              <td className="p-2 border border-gray-700">{payment.remark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


  )
}

export default Fees
