import { useEffect, useState } from "react";

const SelectCountry = ({ countries, moveToNextStep }) => {
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleChange = (e) => {
    setSelectedCountry(countries[e.target.value]);
  };

  useEffect(() => {
    if (!!selectedCountry) {
      moveToNextStep(selectedCountry);
    }
  }, [selectedCountry]);

  return (
    <select className="w-full outline-none" name="countries" onChange={handleChange}>
      <option value="" disabled>
        Please select
      </option>
      {countries.map((country, index) => (
        <option key={index} value={index}>
          {country.name}
        </option>
      ))}
    </select>
  );
};

export default SelectCountry;
