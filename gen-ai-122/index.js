import dotenv from "dotenv";
dotenv.config();
import { ChatMistralAI } from "@langchain/mistralai";
import readline from 'readline/promises';
import { HumanMessage } from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { MemorySaver } from "@langchain/langgraph";
import sendEmail from "./mailer.js";
import * as z from "zod";

// 1. Define the Tool
const emailTool = tool(
    async ({ to, subject, html }) => {
        try {
            await sendEmail(to, subject, html);
            return "SUCCESS: Email sent.";
        } catch (error) {
            return `ERROR: ${error.message}`;
        }
    },
    {   
        name: "sendEmail",
        description: "Sends an email to a recipient with a subject and HTML body.",
        schema: z.object({
            to: z.string().email().describe("Recipient email address"),
            subject: z.string().describe("Email subject line"),
            html: z.string().describe("HTML content of the email"),
        })
    }
);

// 2. Setup the Model
const model = new ChatMistralAI({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-small-latest",
    temperature: 0, // Lower temperature is better for tool calling
});

// 3. Create the Agent with Memory
const memory = new MemorySaver();
const agent = createReactAgent({
    llm: model,
    tools: [emailTool],
    checkpointSaver: memory,
});

// 4. Chat Interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const config = { configurable: { thread_id: "user_1" } };

console.log("--- AI Agent Ready ---");

while (true) {
    const userInput = await rl.question("\nYou: ");
    
    if (["exit", "quit", "bye"].includes(userInput.toLowerCase())) {
        console.log("Goodbye!");
        break;
    }

    // Use agent.invoke to handle the entire thought/action loop
    const result = await agent.invoke(
        { messages: [new HumanMessage(userInput)] },
        config
    );

    // The last message in the array is the AI's final answer
    const finalResponse = result.messages[result.messages.length - 1];
    console.log("\nAI: " + finalResponse.content);
}

rl.close();