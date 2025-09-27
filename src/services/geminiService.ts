import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Quiz } from '../types';

// Use a placeholder API key for demo purposes
const API_KEY = "demo-key-replace-with-real-key";

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = "gemini-2.5-flash";

/**
 * Generates a quiz based on the provided lesson content.
 * @param lessonContent The text content of the lesson.
 * @param lessonTitle The title of the lesson.
 * @returns A promise that resolves to a Quiz object.
 */
export const generateQuiz = async (lessonContent: string, lessonTitle: string): Promise<Quiz> => {
  // For demo purposes, return a mock quiz
  const mockQuiz: Quiz = {
    title: `Quiz: ${lessonTitle}`,
    questions: [
      {
        question: "What is the main focus of this lesson?",
        options: [
          "Understanding basic concepts",
          "Advanced implementation",
          "Historical context",
          "Future predictions"
        ],
        correctAnswer: "Understanding basic concepts"
      },
      {
        question: "Which of the following is a key takeaway from this lesson?",
        options: [
          "Technology is complex",
          "Learning requires practice",
          "AI is transforming industries",
          "All of the above"
        ],
        correctAnswer: "All of the above"
      },
      {
        question: "How can you apply what you learned in this lesson?",
        options: [
          "By practicing regularly",
          "By ignoring the concepts",
          "By memorizing definitions",
          "By avoiding technology"
        ],
        correctAnswer: "By practicing regularly"
      }
    ]
  };

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return mockQuiz;
};

/**
 * Summarizes the provided content into key bullet points.
 * @param content The text content to summarize.
 * @returns A promise that resolves to a string containing the summary.
 */
export const summarizeContent = async (content: string): Promise<string> => {
  // For demo purposes, generate a mock summary
  const mockSummary = `• Key concepts and definitions are fundamental to understanding the topic
• Practical applications demonstrate real-world relevance and importance
• Continuous learning and practice are essential for mastery`;

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return mockSummary;
};