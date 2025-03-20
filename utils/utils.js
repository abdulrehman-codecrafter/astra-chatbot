// src/utils/gemini.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function getGeminiResponse(updatedMessages, newMessage) {
    try {
        const chat = model.startChat({ history: updatedMessages });
        const result = await chat.sendMessage(newMessage);
        const response =  result.response;
        const text = response.text();

        return {
            success: true,
            geminiResponse: text
        };
    } catch (error) {
        console.error("Error communicating with Gemini:", error);
        return {
            success: false,
            updatedMessages: [...updatedMessages, { role: "model", parts: [{ text: "Sorry, I encountered an error. Please try again later." }] }], // Corrected format
        };
    }
}