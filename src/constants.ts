
import { Lesson } from './types';

export const LESSONS: Lesson[] = [
  {
    id: 'L1',
    title: 'Welcome to Modern AI',
    duration: 15,
    content: `
Welcome to the 'Introduction to Modern AI' course by Ecode Technology! 
This first lesson provides a foundational overview of what Artificial Intelligence (AI) is and its significance in today's world.

What is AI?
Artificial Intelligence is a broad field of computer science focused on creating systems that can perform tasks that typically require human intelligence. This includes learning, reasoning, problem-solving, perception, and language understanding.

Key Concepts:
- Machine Learning (ML): A subset of AI where systems learn from data to improve their performance on a task without being explicitly programmed. For example, a spam filter learns to identify junk mail by analyzing past emails.
- Deep Learning (DL): A subset of ML that uses neural networks with many layers (hence "deep") to analyze various factors of data. It's the technology behind self-driving cars and voice assistants.
- Generative AI: A newer category of AI that can create new content, such as text, images, music, and code. The AI tutor you'll interact with is an example of generative AI.

Why is AI Important?
AI is transforming industries from healthcare to finance to entertainment. It automates repetitive tasks, provides deep insights from large datasets, and enables personalized user experiences. Understanding AI is becoming a crucial skill in the modern workforce.
In the next lessons, we will dive deeper into each of these concepts.
`
  },
  {
    id: 'L2',
    title: 'Understanding Machine Learning',
    duration: 25,
    content: `
This lesson focuses on Machine Learning (ML), the engine that powers many AI applications.

Core Idea of ML:
Instead of writing explicit rules for a program, we feed it a large amount of data and let it learn the patterns itself. The output is a 'model' that can make predictions or decisions based on new, unseen data.

Types of Machine Learning:
1.  Supervised Learning: The most common type. The AI is trained on a 'labeled' dataset, meaning each piece of data is tagged with the correct outcome.
    - Example: Training a model to predict house prices using a dataset of houses where each house's features (size, location) are paired with its final sale price.
    - Use Cases: Image classification, spam detection, medical diagnosis.

2.  Unsupervised Learning: The AI is given 'unlabeled' data and must find patterns and structures on its own.
    - Example: A marketing platform grouping customers into different segments based on their purchasing behavior, without any prior knowledge of those segments.
    - Use Cases: Customer segmentation, anomaly detection, data compression.

3.  Reinforcement Learning: The AI, or 'agent', learns by interacting with an environment. It receives rewards for good actions and penalties for bad ones, with the goal of maximizing its total reward.
    - Example: Training an AI to play a game like chess. It learns which moves are good by winning (reward) and losing (penalty).
    - Use Cases: Robotics, game AI, resource management in networks.
`
  },
  {
    id: 'L3',
    title: 'Introduction to Generative AI',
    duration: 20,
    content: `
Let's explore Generative AI, one of the most exciting and rapidly advancing areas of AI.

What makes it 'Generative'?
Unlike traditional AI models that are 'discriminative' (e.g., classifying an image as a 'cat' or 'dog'), generative models create entirely new content that is similar to the data they were trained on. They don't just recognize patterns; they generate new instances of those patterns.

How does it work?
Generative models, especially Large Language Models (LLMs) like Gemini, are trained on vast amounts of text and image data from the internet. They learn the relationships, context, grammar, and styles present in this data. When given a prompt, they use this learned knowledge to predict the next most likely sequence of words or pixels, effectively generating a coherent and contextually relevant response.

Key Applications:
- Content Creation: Writing articles, emails, and marketing copy.
- Code Generation: Writing and debugging code snippets in various programming languages.
- Art and Design: Creating unique images, illustrations, and designs from text descriptions.
- Chatbots and Virtual Assistants: Powering highly conversational and knowledgeable AI tutors, like the one in this course!
- Summarization and Translation: Condensing long documents into key points and translating between languages.

The ability of Generative AI to create is what makes it a powerful tool for creativity and productivity.
`
  },
  {
    id: 'L4',
    title: 'The Role of Data in AI',
    duration: 15,
    content: `
Data is the lifeblood of AI. Without high-quality, relevant data, even the most advanced algorithms cannot perform well.

Data Quality Matters:
The principle of "Garbage In, Garbage Out" is critical in AI. If a model is trained on data that is inaccurate, biased, or incomplete, its outputs will also be inaccurate, biased, or unreliable.
- Bias: If training data primarily represents one demographic, the model may perform poorly for other demographics. For example, a facial recognition system trained mostly on one ethnicity may be less accurate for others.
- Accuracy: Errors in labeling data during supervised learning will teach the model the wrong things.
- Completeness: Missing data can lead to skewed understandings and poor predictions.

The Data Lifecycle in AI:
1.  Collection: Gathering raw data from various sources (e.g., user interactions, sensors, public datasets).
2.  Preparation & Cleaning: Formatting the data, handling missing values, and removing errors or inconsistencies. This is often the most time-consuming part of an AI project.
3.  Feature Engineering: Selecting and transforming the most relevant data variables (features) to improve the model's performance.
4.  Training: Feeding the prepared data to the ML algorithm to build the model.
5.  Evaluation: Testing the model's performance on a separate set of data (the 'test set') that it hasn't seen before.
6.  Deployment & Monitoring: Using the model in a real-world application and continuously monitoring its performance to ensure it remains accurate over time.
`
  }
];
