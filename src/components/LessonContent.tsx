
import React, { useState, useCallback } from 'react';
import { Lesson, Quiz } from '../types';
import { generateQuiz, summarizeContent } from '../services/geminiService';
import { BrainCircuitIcon, ClipboardListIcon, LoaderIcon, SparklesIcon } from './Icons';
import ChatInterface from './ChatInterface';
import QuizModal from './QuizModal';

interface LessonContentProps {
  lesson: Lesson;
}

type ActionState = 'idle' | 'loading' | 'error';

const LessonContent: React.FC<LessonContentProps> = ({ lesson }) => {
  const [summary, setSummary] = useState('');
  const [quizData, setQuizData] = useState<Quiz | null>(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [summaryState, setSummaryState] = useState<ActionState>('idle');
  const [quizState, setQuizState] = useState<ActionState>('idle');

  const handleSummarize = useCallback(async () => {
    setSummaryState('loading');
    setSummary('');
    try {
      const result = await summarizeContent(lesson.content);
      setSummary(result);
      setSummaryState('idle');
    } catch (error) {
      console.error("Failed to summarize content:", error);
      setSummary('Sorry, I was unable to generate a summary. Please try again.');
      setSummaryState('error');
    }
  }, [lesson.content]);

  const handleGenerateQuiz = useCallback(async () => {
    setQuizState('loading');
    setQuizData(null);
    try {
      const result = await generateQuiz(lesson.content, lesson.title);
      setQuizData(result);
      setIsQuizModalOpen(true);
      setQuizState('idle');
    } catch (error) {
      console.error("Failed to generate quiz:", error);
      // In a real app, you'd show a toast notification here
      alert("Sorry, there was an error creating the quiz. Please try again.");
      setQuizState('error');
    }
  }, [lesson.content, lesson.title]);

  return (
    <div className="animate-slide-in-up space-y-8">
      <div className="bg-brand-secondary/30 border border-slate-700/80 rounded-lg p-6 lg:p-8 shadow-md">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">{lesson.title}</h1>
        <p className="text-slate-400 mb-6">Estimated read time: {lesson.duration} minutes</p>
        
        <div className="prose prose-invert prose-lg max-w-none prose-p:text-slate-300 prose-headings:text-slate-100 prose-strong:text-brand-light-blue prose-ul:text-slate-300">
          {lesson.content.split('\n').map((paragraph, index) => {
              if (paragraph.trim() === '') return null;
              if (paragraph.startsWith('- ')) {
                  return <ul key={index} className="list-disc list-inside ml-4"><li className="mb-2">{paragraph.substring(2)}</li></ul>
              }
              if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
                return <ol key={index} className="list-decimal list-inside ml-4"><li className="mb-2">{paragraph.substring(3)}</li></ol>
              }
              const isHeading = ['What is AI?', 'Key Concepts:', 'Why is AI Important?', 'Core Idea of ML:', 'Types of Machine Learning:', 'What makes it \'Generative\'?', 'How does it work?', 'Key Applications:', 'Data Quality Matters:', 'The Data Lifecycle in AI:'].includes(paragraph.trim());
              if(isHeading){
                  return <h3 key={index} className="text-xl font-semibold text-brand-light-blue mt-6 mb-2">{paragraph}</h3>
              }
              return <p key={index} className="mb-4">{paragraph}</p>;
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-700 flex flex-col sm:flex-row gap-4">
          <button onClick={handleSummarize} disabled={summaryState === 'loading'} className="flex items-center justify-center gap-2 px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-500 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed">
            {summaryState === 'loading' ? <LoaderIcon className="w-5 h-5 animate-spin" /> : <SparklesIcon className="w-5 h-5" />}
            <span>{summaryState === 'loading' ? 'Summarizing...' : 'Summarize Key Points'}</span>
          </button>
          <button onClick={handleGenerateQuiz} disabled={quizState === 'loading'} className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed">
            {quizState === 'loading' ? <LoaderIcon className="w-5 h-5 animate-spin" /> : <ClipboardListIcon className="w-5 h-5" />}
            <span>{quizState === 'loading' ? 'Building Quiz...' : 'Test Your Knowledge'}</span>
          </button>
        </div>

        {summary && summaryState !== 'loading' && (
          <div className="mt-6 p-4 bg-brand-dark/50 border border-brand-blue/30 rounded-lg animate-fade-in">
             <h3 className="font-bold text-lg text-brand-light-blue mb-2">Summary:</h3>
             <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-ul:text-slate-300">
                {summary.split('\n- ').map((item, index) => item.trim() && <p key={index}>• {item.replace(/^- /, '')}</p>)}
             </div>
          </div>
        )}
      </div>

      <div className="bg-brand-secondary/30 border border-slate-700/80 rounded-lg p-6 lg:p-8 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <BrainCircuitIcon className="w-8 h-8 text-brand-light-blue"/>
          <h2 className="text-2xl font-bold text-white">AI Tutor</h2>
        </div>
        <p className="text-slate-400 mb-6">Have questions about "{lesson.title}"? Ask E-Tutor for help!</p>
        <ChatInterface lesson={lesson} />
      </div>

      {quizData && (
        <QuizModal 
          isOpen={isQuizModalOpen} 
          onClose={() => setIsQuizModalOpen(false)}
          quiz={quizData} 
        />
      )}
    </div>
  );
};

export default LessonContent;
