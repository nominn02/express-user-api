import { GoogleGenAI } from "@google/genai";

const apiKey = "AIzaSyBU-D0IxwngZUyW5fGW-qjLEBHoQNtaBgo";
const ai = new GoogleGenAI({ apiKey: apiKey });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "",
  });
  console.log(response.text);
}

await main();