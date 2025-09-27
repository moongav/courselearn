
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Quiz } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = "gemini-2.5-flash";

/**
 * Generates a quiz based on the provided lesson content.
 * @param lessonContent The text content of the lesson.
 * @param lessonTitle The title of the lesson.
 * @returns A promise that resolves to a Quiz object.
 */
export const generateQuiz = async (lessonContent: string, lessonTitle: string): Promise<Quiz> => {
  const prompt = `Based on the following lesson content, generate a multiple-choice quiz with 3 questions. 
For each question, provide 4 options and indicate the correct answer. The quiz should test understanding of the key concepts in the text.

Lesson Content:
---
${lessonContent}
---
`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      questions: {
        type: Type.ARRAY,
        description: "An array of quiz questions.",
        items: {
          type: Type.OBJECT,
          properties: {
            question: {
              type: Type.STRING,
              description: "The question text."
            },
            options: {
              type: Type.ARRAY,
              description: "An array of 4 possible answers (strings).",
              items: { type: Type.STRING }
            },
            correctAnswer: {
              type: Type.STRING,
              description: "The exact string of the correct answer from the options."
            }
          },
          required: ["question", "options", "correctAnswer"]
        }
      }
    },
    required: ["questions"]
  };

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);

    if (!parsedJson.questions || !Array.isArray(parsedJson.questions)) {
        throw new Error("Invalid quiz format received from API.");
    }

    return {
      title: `Quiz: ${lessonTitle}`,
      questions: parsedJson.questions,
    };
  } catch (error) {
    console.error("Error generating quiz from Gemini API:", error);
    throw new Error("Failed to generate quiz. The API returned an unexpected response.");
  }
};

/**
 * Summarizes the provided content into key bullet points.
 * @param content The text content to summarize.
 * @returns A promise that resolves to a string containing the summary.
 */
export const summarizeContent = async (content: string): Promise<string> => {
  const prompt = `Summarize the following text in three clear and concise key bullet points.
Focus on the most important concepts and takeaways.

Text to summarize:
---
${content}
---
`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        // Disable thinking for faster, more direct responses on a simple task.
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error summarizing content from Gemini API:", error);
    throw new Error("Failed to summarize content.");
  }
};
