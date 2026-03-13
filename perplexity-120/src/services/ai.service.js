//ai se jitna baatcheet sab idhr hoga
//we are going to use langchain -gemini
import dotenv from "dotenv";
dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

export async function testAi() {
  const response = await model.invoke("What is capital of india?");
  console.log(response);
}

