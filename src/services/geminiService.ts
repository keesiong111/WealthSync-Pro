import { GoogleGenAI } from "@google/genai";

let genAI: GoogleGenAI | null = null;

function getGenAI() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set. Please add it to your environment variables.");
    }
    genAI = new GoogleGenAI(apiKey);
  }
  return genAI;
}

export async function getFinancialAdvice(data: any) {
  const model = "gemini-3-flash-preview";
  const prompt = `Based on these financial and health metrics, provide a concise planning strategy for moving to Singapore at 30 and retiring at 40. 
  Data: ${JSON.stringify(data)}
  Focus on:
  1. Salary allocation optimization.
  2. Savings and EPF/CPF transitions.
  3. Health maintenance for long-term productivity.
  Keep it professional, encouraging, and structured.`;

  try {
    const ai = getGenAI();
    const result = await ai.getGenerativeModel({ model }).generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    if (error instanceof Error && error.message.includes("GEMINI_API_KEY")) {
      return "Config Error: GEMINI_API_KEY is missing in environment variables.";
    }
    return "I'm currently recalibrating my financial wisdom. Please try again in a moment.";
  }
}

export async function getHealthTips(healthData: any) {
  const model = "gemini-3-flash-preview";
  const prompt = `Analyze these health metrics and suggest 3 actionable steps to improve wellness while living a high-paced city life (Singapore).
  Data: ${JSON.stringify(healthData)}`;

  try {
    const ai = getGenAI();
    const result = await ai.getGenerativeModel({ model }).generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    if (error instanceof Error && error.message.includes("GEMINI_API_KEY")) {
      return "Config Error: GEMINI_API_KEY is missing.";
    }
    return "Health advice is currently buffering...";
  }
}
