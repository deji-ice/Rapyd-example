import { OpenAIApi, Configuration } from "openai";

export default async function handler(req, res) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  try {
    if (req.body.prompt !== undefined) {
      // Introduce a delay before making the API request
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for 1 second

      const completion = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content:
              "create next.js + tailwind css code for button 200 x 100, light purple background, generate text on it. Please create a complete next.js component",
          },
          {
            role: "assistant",
            content: `
              import React from 'react';
              const MyComponent = () => {
                return (
                  <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-3xl font-bold mb-4">Hello World</h1>
                    <p className="text-lg mb-4">Welcome to my Next.js component using Tailwind CSS</p>
                    <button className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">Click Me</button>
                  </div>
                );
              };
              export default MyComponent;
          `,
          },
          {
            role: "user",
            content:
              "Please create html code with inline css what create the following component, Meterial UI look and feel, return only code",
          },
          {role: "user", "content": "DO NOT wrap the returned code with ```"},
          { role: "user", content: `${req.body.prompt}` },
        ],
      });

      const generatedText = completion.data.choices[0].message.content;
      res.status(200).json({ text: generatedText });
    } else {
      res.status(400).json({ error: "No prompt provided." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred." });
  }
}
