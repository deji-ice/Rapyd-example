import React, { useState } from 'react';

const PaymentForm = ({ onFormComplete }) => {

  const [formData, setFormData] = useState({
    amount: '',
    company_name: '',
    account_type: '',
    account_number: '',
    routing_number: '',
    proof_of_authorization: '',
    purpose_code: '',
    name: '',
    addresses: ''
  });

  const handleFormComplete = (event) => {
    event.preventDefault();

    let missingValues = [];
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        missingValues.push(key);
      }
    }

    if (missingValues.length > 0) {
      console.log(`Missing values for: ${missingValues.join(', ')}`);
    } else {
      onFormComplete(formData);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form className="space-y-2.5">
      <input type="number" name="amount" className="w-full p-2 border-2 border-gray-300 rounded-md" onChange={handleChange} placeholder="Amount" />
      <input type="text" name="company_name" className="w-full p-2 border-2 border-gray-300 rounded-md" onChange={handleChange} placeholder="Company Name" />
      <select name="account_type" className="w-full p-2 border-2 border-gray-300 rounded-md" onChange={handleChange}>
        <option value="">--Select Account Type--</option>
        <option value="saving">Saving</option>
        <option value="current">Current</option>
      </select>
      <input type="text" name="account_number" className="w-full p-2 border-2 border-gray-300 rounded-md" onChange={handleChange} placeholder="Account Number" />
      <input type="text" name="routing_number" className="w-full p-2 border-2 border-gray-300 rounded-md" onChange={handleChange} placeholder="Routing Number" />
      <input type="text" name="proof_of_authorization" className="w-full p-2 border-2 border-gray-300 rounded-md" onChange={handleChange} placeholder="Proof of Authorization" />
      <input type="text" name="purpose_code" className="w-full p-2 border-2 border-gray-300 rounded-md" onChange={handleChange} placeholder="Purpose Code" />
      <input type="text" name="name" className="w-full p-2 border-2 border-gray-300 rounded-md" onChange={handleChange} placeholder="Name" />
      <input type="text" name="addresses" className="w-full p-2 border-2 border-gray-300 rounded-md" onChange={handleChange} placeholder="Addresses" />
      <button type="submit" onClick={handleFormComplete} className="block w-1/2 bg-black text-white h-10 px-4 py-2 rounded-md mx-auto mt-4 focus:outline-none hover:bg-gray-700">Submit</button>
    </form>
  );
};
export default PaymentForm;
