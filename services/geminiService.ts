
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { KRISHNA_SYSTEM_INSTRUCTION } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;
  // Fix: Upgraded to gemini-3-pro-preview for deeper philosophical reasoning
  private modelName = 'gemini-3-pro-preview';

  constructor() {
    // Fix: Initializing GoogleGenAI with the correct named parameter and direct environment variable access as per guidelines
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateResponse(prompt: string, history: { role: string; parts: string }[] = []): Promise<string> {
    try {
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: this.modelName,
        contents: [
          ...history.map(h => ({
            role: h.role,
            parts: [{ text: h.parts }]
          })),
          { role: 'user', parts: [{ text: prompt }] }
        ],
        config: {
          systemInstruction: KRISHNA_SYSTEM_INSTRUCTION,
          temperature: 0.8,
          topP: 0.9,
        },
      });

      // Fix: Directly accessing the text property as per latest SDK property definitions
      return response.text || "My dear friend, the connection to the divine is temporarily obscured. Please try again.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Forgive me, Partha, but my voice is currently hushed by the winds of the digital realm. Let us try speaking again shortly.";
    }
  }

  async *streamResponse(prompt: string, history: { role: string; parts: string }[] = []) {
    try {
      const responseStream = await this.ai.models.generateContentStream({
        model: this.modelName,
        contents: [
          ...history.map(h => ({
            role: h.role,
            parts: [{ text: h.parts }]
          })),
          { role: 'user', parts: [{ text: prompt }] }
        ],
        config: {
          systemInstruction: KRISHNA_SYSTEM_INSTRUCTION,
          temperature: 0.8,
          topP: 0.9,
        },
      });

      for await (const chunk of responseStream) {
        // Fix: Accessing text property directly from the chunk
        yield chunk.text;
      }
    } catch (error) {
      console.error("Gemini Streaming Error:", error);
      yield "Alas, our conversation has been interrupted.";
    }
  }
}

export const geminiService = new GeminiService();
