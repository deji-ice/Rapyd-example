import { OpenAIApi, Configuration } from "openai";

export default async function handler(req, res) {
  const configuration = new Configuration({
  
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  try {
    if (req.body.prompt !== undefined) {
      // Introduce a delay before making the API request
      await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for 1 second

      const completion = await openai.createChatCompletion({
        model: "gpt-4",
        prompt: `${req.body.prompt}`,
      });

      const generatedText = completion.data.choices[0].text;
      res.status(200).json({ text: generatedText });
    } else {
      res.status(400).json({ error: "No prompt provided." });
    }
  } 
   catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred." });
   }
}
