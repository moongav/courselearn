
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Lesson, ChatMessage, MessageSender } from '../types';
import { SendIcon, LoaderIcon, UserIcon, BotIcon } from './Icons';

interface ChatInterfaceProps {
    lesson: Lesson;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const ChatInterface: React.FC<ChatInterfaceProps> = ({ lesson }) => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initialize chat when lesson changes
        const initChat = () => {
            const newChat = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: `You are a helpful and encouraging tutor for a technology course. Your name is E-Tutor. 
                    Your goal is to help the user understand the provided lesson content.
                    Base your answers strictly on the following lesson material. Do not introduce outside concepts unless directly asked. 
                    If the user asks something unrelated to the lesson, gently guide them back to the topic. Be concise and clear.
                    Here is the current lesson:
                    Title: ${lesson.title}
                    Content: ${lesson.content}`,
                },
            });
            setChat(newChat);
            setMessages([
                { id: Date.now().toString(), text: `Hello! I'm E-Tutor. How can I help you with the lesson on "${lesson.title}"?`, sender: MessageSender.AI }
            ]);
        };
        initChat();
    }, [lesson]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !chat || isLoading) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            text: input,
            sender: MessageSender.USER,
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // Add a temporary AI message for streaming
        const aiMessageId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, { id: aiMessageId, text: '', sender: MessageSender.AI, isStreaming: true }]);

        try {
            const stream = await chat.sendMessageStream({ message: input });

            for await (const chunk of stream) {
                const chunkText = chunk.text;
                setMessages(prev => prev.map(msg => 
                    msg.id === aiMessageId ? { ...msg, text: msg.text + chunkText } : msg
                ));
            }

        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId ? { ...msg, text: "Sorry, I encountered an error. Please try again." } : msg
            ));
        } finally {
            setIsLoading(false);
             setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId ? { ...msg, isStreaming: false } : msg
            ));
        }
    }, [chat, input, isLoading]);

    return (
        <div className="flex flex-col h-[500px] bg-brand-dark/60 rounded-lg border border-slate-700">
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === MessageSender.USER ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === MessageSender.AI && (
                            <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0">
                                <BotIcon className="w-5 h-5 text-white" />
                            </div>
                        )}
                        <div className={`max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
                            msg.sender === MessageSender.USER 
                            ? 'bg-brand-blue text-white rounded-br-none' 
                            : 'bg-slate-700 text-slate-200 rounded-bl-none'
                        }`}>
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                            {msg.isStreaming && <LoaderIcon className="w-4 h-4 animate-spin inline-block ml-2"/>}
                        </div>
                        {msg.sender === MessageSender.USER && (
                             <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0">
                                <UserIcon className="w-5 h-5 text-white" />
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700 flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question here..."
                    disabled={isLoading}
                    className="flex-grow bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
                />
                <button type="submit" disabled={isLoading || !input.trim()} className="bg-brand-blue text-white rounded-lg p-2 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors">
                    {isLoading ? <LoaderIcon className="w-6 h-6 animate-spin" /> : <SendIcon className="w-6 h-6" />}
                </button>
            </form>
        </div>
    );
};

export default ChatInterface;
