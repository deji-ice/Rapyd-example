import { useEffect, useState } from "react";

const SelectPaymentMethod = ({ paymentMethod, moveToNextStep }) => {
  const [selectedType, setSelectedType] = useState("");

  const handleChange = (e) => {
    setSelectedType(e.target.value);
  };

  useEffect(() => {
    if (selectedType != "") {
      moveToNextStep(selectedType);
    }
  }, [selectedType]);

  return (
    <select className="w-full outline-none" name="type" onChange={handleChange} defaultValue="">
      <option value="" disabled>
        Please select Payment Method
      </option>
      {paymentMethod.map((payment, index) => (
        <option className="flex" key={index} value={payment.type}>
          {payment.name}
        </option>
      ))}
    </select>
  );
};
export default SelectPaymentMethod;
