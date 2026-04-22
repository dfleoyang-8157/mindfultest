import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateGuidedMeditation(mood: string, duration: number) {
  if (!process.env.GEMINI_API_KEY) {
    return "請在 GitHub Secrets 中設定 VITE_GEMINI_API_KEY，以便啟用 AI 冥想功能。";
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `請生成一個約 ${duration} 分鐘的正念冥想引導。使用者目前的狀態是「${mood}」。
      請提供：
      1. 一個心靈平和的標題。
      2. 一段開場語。
      3. 三到四個正念引導步驟（包含呼吸與想像）。
      4. 一個總結語。
      請以繁體中文撰寫，語氣要溫柔、平靜。`,
      config: {
        temperature: 0.7,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating meditation:", error);
    return "抱歉，目前無法生成冥想引導。請嘗試放鬆呼吸，感受當下的平靜。";
  }
}
