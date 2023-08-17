import { useEffect, useState } from "react";
import Loader from "./loader";
import { removeWordsOutsideCodeBlock } from "../utils/codeFormatter";

const SelectPaymentType = ({ paymentType, moveToNextStep }) => {
  const [selectedType, setSelectedType] = useState();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [response, setResponse] = useState("");

  const getResponseFromOpenAI = async () => {
    setResponse("");
    console.log("Getting response from OpenAI...");
    setIsLoading(true);

    // Extract field names from paymentType.fields
    const fieldNames = paymentType.fields.map((field) => field.name).join(", ");
    console.log(fieldNames);

    // Create a prompt based on the extracted field names
    const prompt = `create next.js + tailwind css code based on these fields, return only code: ${fieldNames}`;

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
      console.log(data);
      setResponse(data.text);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };
  const config = {
    fields: [
      {
        key: "fullname",
        label: "Full Name",
        type: "text",
        isRequired: true,
      },
      { key: "date", label: "Pick a date", type: "date" },
    ],
  };

  useEffect(() => {
    if (paymentType.fields) {
      getResponseFromOpenAI();
    }
  }, [paymentType]);

  useEffect(() => {
    console.log(paymentType);
  });

  useEffect(() => {
    if (!!selectedType) {
      moveToNextStep(selectedType);
    }
  }, [selectedType]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: removeWordsOutsideCodeBlock(response),
          }}
        />
      )}
    </>
  );
};
export default SelectPaymentType;
