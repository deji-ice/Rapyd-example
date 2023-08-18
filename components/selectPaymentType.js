import { useEffect, useState, useCallback } from "react";
import Loader from "./loader";
// import { removeWordsOutsideCodeBlock } from "../utils/codeFormatter";
import GeneratedCodeComponent from "../pages/api/GeneratedCodeComponent";

const SelectPaymentType = ({ paymentType, moveToNextStep }) => {
  // const [selectedType, setSelectedType] = useState();
  // const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState("");
  // const [response, setResponse] = useState("");

  const getResponseFromOpenAI = useCallback(async () => {
    // setResponse("");
    console.log("Getting response from OpenAI...");
    setIsLoading(true);

    // Extract field names from paymentType.fields
    const fieldNames = paymentType.fields.map((field) => field.name).join(", ");

    // Create a prompt based on the extracted field names
    const prompt = `create next.js + tailwind css code based on these fields, generate only the code, use class and not className DO NOT wrap the returned code with backticks and only generate the code, dont add explanatry texts,: ${fieldNames}`;

    try {
      const responses = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      const data = await responses.json();
      setIsLoading(false);

      // setResponse(data.text);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  }, [paymentType]);

  useEffect(() => {
    if (paymentType.fields) {
      console.log("called");
      getResponseFromOpenAI();
    }
  }, [paymentType]);

  // useEffect(() => {
  //   if (!!selectedType) {
  //     moveToNextStep(selectedType);
  //   }
  // }, [selectedType]);

  return <>{isLoading ? <Loader /> : <GeneratedCodeComponent />}</>;
};
export default SelectPaymentType;
