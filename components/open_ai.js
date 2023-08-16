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
      <main  className="flex flex-col items-center justify-center gap-3 text-2xl">
        <div >
          <h1 >Next.js & OpenAI Sample Application</h1>
        </div>

        <div className="flex gap-3 flex-col items-center justify-center" >
          <textarea
            placeholder="Enter a prompt"
            onChange={(e) => setPrompt(e.target.value)}
            row="5"
            cols="50"
          />
          <button  onClick={getResponseFromOpenAI}>
            Get Response
          </button>

          <div>
            {isLoading ? (
              <div>Waiting for response ...</div>
            ) : (
              <div>{response}</div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}