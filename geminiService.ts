
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY for Gemini is not set. AI Assistant will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getBusinessExplanation = async (topic: string): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("La funcionalidad del Asistente de IA está deshabilitada. Por favor, configura una API_KEY.");
  }

  try {
    const systemInstruction = `
Eres un amigable y experto asesor de negocios para emprendedores de subsistencia en Chile.
Tu propósito es explicar conceptos de negocio de forma muy simple, clara y motivadora.
Usa un lenguaje cercano y ejemplos prácticos relevantes para un pequeño negocio.
Evita la jerga complicada. Responde siempre en español.
Mantén tus respuestas concisas y al grano, idealmente en 2 o 3 párrafos.
Empieza siempre con un tono positivo y alentador.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Explícame de forma sencilla qué es y para qué sirve "${topic}" en mi pequeño emprendimiento.`,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching explanation from Gemini:", error);
    return "¡Ups! Parece que hubo un problema al contactar al asistente. Por favor, inténtalo de nuevo más tarde.";
  }
};
