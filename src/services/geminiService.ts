import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI: GoogleGenerativeAI | null = null;

function getGenAI() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

export async function getFinancialAdvice(data: any) {
  const modelName = "gemini-1.5-flash"; 
  const prompt = `Based on these financial and health metrics, provide a concise planning strategy for moving to Singapore at 30 and retiring at 40. 
  Data: ${JSON.stringify(data)}
  Focus on:
  1. Salary allocation optimization.
  2. Savings and EPF/CPF transitions.
  3. Health maintenance for long-term productivity.
  Keep it professional, encouraging, and structured.`;

  try {
    const ai = getGenAI();
    if (!ai) {
      return "Config Error: GEMINI_API_KEY is not set. Please provide it in environment variables.";
    }
    const model = ai.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm currently recalibrating my financial wisdom. Error: " + (error instanceof Error ? error.message : "Service unavailable");
  }
}

export async function getHealthTips(healthData: any) {
  const modelName = "gemini-1.5-flash";
  const prompt = `Analyze these health metrics and suggest 3 actionable steps to improve wellness while living a high-paced city life (Singapore).
  Data: ${JSON.stringify(healthData)}`;

  try {
    const ai = getGenAI();
    if (!ai) {
      return "Config Error: GEMINI_API_KEY is missing.";
    }
    const model = ai.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Health advice is currently unavailable. Error: " + (error instanceof Error ? error.message : "Check connectivity.");
  }
}
