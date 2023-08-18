import { useEffect, useState, useCallback } from "react";
import loadable from "@loadable/component";
import Loader from "./loader";
// import { removeWordsOutsideCodeBlock } from "../utils/codeFormatter";

const SelectPaymentType = ({ paymentType, moveToNextStep }) => {
  // const [selectedType, setSelectedType] = useState();
  // const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [content, setContent] = useState("");

  const getResponseFromOpenAI = useCallback(async () => {
    setContent("");
    console.log("Getting response from OpenAI...");
    setIsLoading(true);

    // Extract field names from paymentType.fields
    const fieldNames = paymentType.fields.map((field) => field.name).join(", ");

    // Create a prompt based on the extracted field names
    const prompt = `create a react.js component styled with tailwind css based on these fields and with an off white background color  style all the tags and buttons with nice colors and borders and make the height & width fit the content , generate only the code, DO NOT wrap the returned code with backticks. ONLY generate the code, DO NOT add any explanatory texts, here are the fields and make the submit button console.log the inputs: ${fieldNames} `;

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

      setContent(data.text);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  }, [paymentType]);

  console.log("rerenders");

  useEffect(() => {
    if (paymentType.fields && content === "") {
      console.log("called");
      getResponseFromOpenAI();
    }
  }, [paymentType]);

  // useEffect(() => {
  //   if (!!selectedType) {
  //     moveToNextStep(selectedType);
  //   }
  // }, [selectedType]);

  return <>{isLoading || !content.length ? <Loader /> : <LoadableComponent />}</>;
}
export default SelectPaymentType;

const LoadableComponent = loadable(() => import("../utils/GeneratedCodeComponent"), {
  fallback: <div>Page is Loading...</div>,
});
