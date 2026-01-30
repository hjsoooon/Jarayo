
import { GoogleGenAI, Type } from "@google/genai";
import { Coach, Message, ActionTip, CoachRole } from "./types";
import { COACHES } from "./constants";

export const getGeminiResponse = async (
  history: Message[], 
  userPrompt: string, 
  forcedCoachId?: CoachRole
): Promise<{ text: string, tips?: ActionTip[], selectedCoachId: CoachRole }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const contents: any[] = history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.content }]
    }));

    contents.push({ role: 'user', parts: [{ text: userPrompt }] });

    // 전문가들의 특성을 프롬프트에 포함하여 라우팅 정확도 향상
    const coachInfos = COACHES.map(c => `${c.id}: ${c.name}(${c.title}) - ${c.description}`).join("\n");

    const systemInstruction = `
      당신은 대한민국 최고의 육아 전문가 팀의 컨시어지 AI입니다.
      
      [미션]
      1. 사용자의 질문 의도(Intent)를 분석하여 가장 적합한 전문가(Coach ID)를 선택하세요.
      2. 선택된 전문가의 고유한 페르소나, 말투, 전문 지식을 바탕으로 답변하세요.
      3. 질문이 여러 분야에 걸쳐 있다면, 가장 비중이 큰 전문가를 선택하되 답변 내용에 다른 전문가의 관점도 포함하세요.
      
      [전문가 팀 프로필]
      ${coachInfos}

      [현재 제약 사항]
      - 만약 forcedCoachId가 특정 전문가로 지정되어 있다면, 반드시 그 전문가의 정체성으로 답변해야 합니다. (지정값: ${forcedCoachId || '없음'})
      
      [출력 규칙]
      - 답변은 반드시 유효한 JSON 형식이어야 합니다.
      - 'text': 전문가의 페르소나가 담긴 친절하고 전문적인 답변 내용.
      - 'selectedCoachId': 답변을 수행한 전문가의 ID.
      - 'tips': 사용자가 즉시 실천할 수 있는 1-2개의 '카드뉴스' 형태의 콘텐츠 (ActionTip 형식).
        * 각 팁은 "실행 가능한 구체적인 솔루션"이어야 합니다.
        * 카드뉴스 느낌이 나도록 제목을 매력적으로 뽑아주세요.
      - 한국어로 자연스럽고 따뜻하게 답변하세요.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            selectedCoachId: { 
              type: Type.STRING,
              description: "The ID of the expert chosen to answer."
            },
            tips: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  icon: { type: Type.STRING, description: "Relevant emoji icon" },
                  title: { type: Type.STRING, description: "Catchy title like a card news headline" },
                  description: { type: Type.STRING, description: "Short summary of the solution" },
                  type: { type: Type.STRING, enum: ["SUCCESS", "WARNING", "INFO"] }
                },
                required: ["icon", "title", "description", "type"]
              }
            }
          },
          required: ["text", "selectedCoachId"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      text: result.text || "죄송합니다. 전문가 팀에서 답변을 준비하는 중 오류가 발생했습니다.",
      tips: result.tips,
      selectedCoachId: (result.selectedCoachId as CoachRole) || 'PSYCHOLOGY'
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { 
      text: "네트워크 상태가 불안정하여 전문가와 연결이 지연되고 있습니다. 잠시 후 다시 시도해주세요.", 
      selectedCoachId: (forcedCoachId || 'PSYCHOLOGY') as CoachRole 
    };
  }
};
