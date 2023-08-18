import React from 'react';

const CardForm = () => {
  return (
    <div className="flex flex-col items-center p-5">
      <div className="w-1/2">
        <label htmlFor="number" className="block text-gray-700 text-sm font-bold mb-2">Card Number:</label>
        <input type="text" id="number" name="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

        <label htmlFor="expiration_month" className="block text-gray-700 text-sm font-bold mb-2 mt-4">Expiration Month:</label>
        <input type="text" id="expiration_month" name="expiration_month" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        
        <label htmlFor="expiration_year" className="block text-gray-700 text-sm font-bold mb-2 mt-4">Expiration Year:</label>
        <input type="text" id="expiration_year" name="expiration_year" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        
        <label htmlFor="cvv" className="block text-gray-700 text-sm font-bold mb-2 mt-4">CVV:</label>
        <input type="text" id="cvv" name="cvv" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 mt-4">Cardholder Name:</label>
        <input type="text" id="name" name="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                
        <label htmlFor="network_reference_id" className="block text-gray-700 text-sm font-bold mb-2 mt-4">Network Reference ID:</label>
        <input type="text" id="network_reference_id" name="network_reference_id" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                
        <label htmlFor="recurrence_type" className="block text-gray-700 text-sm font-bold mb-2 mt-4">Recurrence Type:</label>
        <input type="text" id="recurrence_type" name="recurrence_type" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4">Submit</button>
      </div>
    </div>
  );
};

export default CardForm;