
import { GoogleGenAI, Type } from "@google/genai";
import { Coach, Message, ActionTip } from "./types";

export const getGeminiResponse = async (coach: Coach, history: Message[], userPrompt: string, imageBase64?: string): Promise<{ text: string, tips?: ActionTip[] }> => {
  // Always create a new GoogleGenAI instance right before making an API call to ensure it uses the most up-to-date API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const contents: any[] = history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.content }]
    }));

    const userParts: any[] = [{ text: userPrompt }];
    if (imageBase64) {
      userParts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64.split(",")[1]
        }
      });
    }

    contents.push({ role: 'user', parts: userParts });

    // Using gemini-3-pro-preview for complex pediatric health reasoning and JSON structured output.
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents,
      config: {
        systemInstruction: coach.systemPrompt + "\n반드시 한국어로 답변하고, 가능하다면 답변 본문과 함께 실천 가능한 팁(tips)을 JSON 구조로 포함해줘.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING, description: "상세 답변 텍스트 (마크다운 지원)" },
            tips: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  icon: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ["SUCCESS", "WARNING", "INFO"] }
                },
                required: ["icon", "title", "description", "type"]
              }
            }
          },
          required: ["text"]
        }
      }
    });

    // Access the .text property directly as per the latest SDK guidelines.
    const result = JSON.parse(response.text || "{}");
    return {
      text: result.text || "죄송합니다. 답변을 생성하는 중에 문제가 발생했습니다.",
      tips: result.tips
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요." };
  }
};
