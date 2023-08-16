import { useEffect, useState } from "react";

const SelectPaymentMethod = ({ paymentType, moveToNextStep }) => {
  const [selectedType, setSelectedType] = useState();

  const handleChange = (e) => {
    console.log(e.target.value);
    setSelectedType(paymentType[e.target.value]);
  };

  useEffect(() => {
    if (!!selectedType) {
      console.log("selected pay", selectedType);
      moveToNextStep(selectedType);
    }
  }, [selectedType]);

  return (
    <select
      className="w-full outline-none"
      name="type"
      onChange={handleChange}
      defaultValue=""
    >
      <option value="" disabled>
        Please select Payment Method
      </option>
      {paymentType.map((payment, index) => (
        <option className="flex" key={index} value={payment.type}>
          <img className="w-3 h-2" src={payment.image} alt={payment.name} />{" "}
          {payment.name}
        </option>
      ))}
    </select>
  );
};
export default SelectPaymentMethod;
