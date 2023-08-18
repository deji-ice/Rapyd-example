import React, { useState } from "react";

const CreditCardForm = () => {
  const [formState, setFormState] = useState({
    number: "",
    expiration_month: "",
    expiration_year: "",
    cvv: "",
    name: "",
    network_reference_id: "",
    recurrence_type: ""
  });

  const handleSubmit = event => {
    event.preventDefault();
    console.log(formState);
  }

  const handleInputChange = event => {
    const target = event.target;
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <div className="bg-offWhite p-5 rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">Number</label>
          <input type="text" name="number" value={formState.number} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">Expiration Month</label>
          <input type="text" name="expiration_month" value={formState.expiration_month} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">Expiration Year</label>
          <input type="text" name="expiration_year" value={formState.expiration_year} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">CVV</label>
          <input type="text" name="cvv" value={formState.cvv} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input type="text" name="name" value={formState.name} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">Network Reference ID</label>
          <input type="text" name="network_reference_id" value={formState.network_reference_id} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">Recurrence Type</label>
          <input type="text" name="recurrence_type" value={formState.recurrence_type} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
      </form>
    </div>
  )
}

export default CreditCardForm;