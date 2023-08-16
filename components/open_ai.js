import Head from "next/head";
import { useState, useEffect } from "react";


export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  const getResponseFromOpenAI = async () => {
    setResponse("");
    console.log("Getting response from OpenAI...");
    setIsLoading(true);
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    const data = await response.json();
    setIsLoading(false);
    console.log(data);
    setResponse(data.text);
  };

  return (
    <>
      <main  className="flex flex-col items-center justify-center space-y-3 text-2xl">
        <div className=" my-10 font-semibold">
          <h1 >Next.js & OpenAI Sample Application</h1>
        </div>

        <div className=" w-fit flex space-y-5 flex-col items-center justify-center" >
          <textarea
          className="border-2 p-3 h-40 text-sm flex items-center justify-start border-slate-900 rounded-lg "
            placeholder="Enter a prompt"
            onChange={(e) => setPrompt(e.target.value)}
            row="10"
            cols="50"
          />
          <button className="rounded-full bg-blue-600 text-white p-3"  onClick={getResponseFromOpenAI}>
            Get Response
          </button>

          <div className="flex flex-col items-center justify-center overflow-x-hidden">
            {isLoading ? (
              <div>Waiting for response ...</div>
            ) : (
              <div className={`bg-yellow-100 w-[50%] p-5 mx-10 flex flex-col justify-center items-center text-sm leading-9`}>{response}</div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}