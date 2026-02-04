
import { GoogleGenAI } from "@google/genai";

// Fix: Follow exact initialization pattern required by @google/genai guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getOliveExpertResponse = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "Eres un sumiller experto en Aceite de Oliva Virgen Extra (AOVE) de España. Conoces todas las variedades (Picual, Arbequina, Hojiblanca, Cornicabra), las Denominaciones de Origen y los beneficios para la salud. Responde de forma elegante, profesional y apasionada sobre el sector español.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Lo siento, como experto estoy algo ocupado en la almazara ahora mismo. ¿Podrías preguntarme algo más tarde?";
  }
};
