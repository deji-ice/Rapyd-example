import { useEffect, useState } from "react";

const SelectPaymentType = ({ paymentType, moveToNextStep }) => {
  const [selectedType, setSelectedType] = useState();

  const handleChange = (e) => {
    setSelectedType(e.target.value);
  };
  useEffect(() => {
    console.log(paymentType.data);
  });
  useEffect(() => {
    if (!!selectedType) {
      moveToNextStep(selectedType);
    }
  }, [selectedType]);

  return (
<>

    </>
  );
};
export default SelectPaymentType;
