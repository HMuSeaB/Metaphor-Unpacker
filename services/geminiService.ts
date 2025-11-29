import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const modelId = "gemini-2.5-flash";

export const analyzeStructure = async (sentence: string) => {
  try {
    const prompt = `
      Analyze this metaphor: "${sentence}".
      Identify the Tenor (the concept being described) and the Vehicle (the image used to describe it).
      Return JSON.
    `;
    
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tenor: { type: Type.STRING },
            vehicle: { type: Type.STRING },
          },
        },
      },
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("AI Error:", error);
    return { tenor: "", vehicle: "" };
  }
};

export const suggestCharacteristics = async (vehicle: string) => {
  try {
    const prompt = `List 3 distinct literal characteristics or functions of a "${vehicle}". Keep them short and factual.`;
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            items: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });
    const parsed = JSON.parse(response.text || "{}");
    return parsed.items || [];
  } catch (error) {
    console.error("AI Error:", error);
    return [];
  }
};

export const suggestMapping = async (literal: string, tenor: string, vehicle: string) => {
  try {
    const prompt = `
      We are analyzing the metaphor: "${tenor} is like ${vehicle}".
      Characteristic of ${vehicle}: "${literal}".
      How does this map to "${tenor}"? What is the equivalent?
      Return a single short sentence explaining the connection.
    `;
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text?.trim() || "";
  } catch (error) {
    console.error("AI Error:", error);
    return "";
  }
};

export const suggestChallenges = async (tenor: string, vehicle: string) => {
  try {
    const prompt = `
      Critically analyze the metaphor: "${tenor} is ${vehicle}".
      Find 3 ways this metaphor breaks down, is misleading, or hides assumptions.
      Return as an array of strings (questions or statements).
    `;
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            items: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });
    const parsed = JSON.parse(response.text || "{}");
    return parsed.items || [];
  } catch (error) {
    console.error("AI Error:", error);
    return [];
  }
};

export const suggestAlternatives = async (tenor: string) => {
  try {
    const prompt = `Suggest 3 alternative metaphors for "${tenor}" that highlight different aspects of it. Return just the metaphors.`;
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            items: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });
    const parsed = JSON.parse(response.text || "{}");
    return parsed.items || [];
  } catch (error) {
    console.error("AI Error:", error);
    return [];
  }
};