
import React, { useState } from 'react';
import { Quiz, QuizQuestion } from '../types';
import { XIcon, CheckCircleIcon, XCircleIcon } from './Icons';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  quiz: Quiz;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, quiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(Array(quiz.questions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];

  const handleSelectAnswer = (option: string) => {
    if (isSubmitted) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = option;
    setSelectedAnswers(newAnswers);
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsSubmitted(true);
    }
  };
  
  const handlePrev = () => {
     if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }
  
  const getScore = () => {
      return selectedAnswers.reduce((score, answer, index) => {
          return answer === quiz.questions[index].correctAnswer ? score + 1 : score;
      }, 0);
  }
  
  const resetQuiz = () => {
      setCurrentQuestionIndex(0);
      setSelectedAnswers(Array(quiz.questions.length).fill(null));
      setIsSubmitted(false);
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-brand-secondary border border-slate-700 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <header className="p-4 flex justify-between items-center border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">{quiz.title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <XIcon className="w-6 h-6" />
          </button>
        </header>

        <main className="p-6 flex-grow overflow-y-auto">
          {isSubmitted ? (
             <div className="text-center flex flex-col items-center justify-center h-full animate-fade-in">
                 <h3 className="text-2xl font-bold text-white">Quiz Completed!</h3>
                 <p className="text-5xl font-bold my-4" style={{ color: getScore() / quiz.questions.length >= 0.7 ? '#4ade80' : '#f87171' }}>
                    {getScore()} / {quiz.questions.length}
                 </p>
                 <p className="text-slate-300">You've completed the quiz. You can review your answers or try again.</p>
                 <div className="mt-6 flex gap-4">
                    <button onClick={resetQuiz} className="bg-brand-blue text-white font-semibold px-6 py-2 rounded-lg hover:bg-sky-500 transition-colors">
                        Try Again
                    </button>
                    <button onClick={onClose} className="bg-slate-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-slate-500 transition-colors">
                        Close
                    </button>
                 </div>
             </div>
          ) : (
            <div>
              <p className="text-sm text-slate-400 mb-2">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
              <h3 className="text-lg font-semibold text-slate-100 mb-6">{currentQuestion.question}</h3>
              <div className="space-y-3">
                {currentQuestion.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectAnswer(option)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center gap-4
                      ${ selectedAnswer === option ? 'border-brand-blue bg-brand-blue/20' : 'border-slate-600 hover:border-brand-blue/50 bg-slate-800' }
                    `}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${ selectedAnswer === option ? 'bg-brand-blue text-white' : 'bg-slate-600 text-slate-200'}`}>{String.fromCharCode(65 + i)}</span>
                    <span>{option}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>
        
        {!isSubmitted && (
          <footer className="p-4 flex justify-between items-center border-t border-slate-700">
             <button onClick={handlePrev} disabled={currentQuestionIndex === 0} className="bg-slate-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-slate-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  Previous
              </button>
              <button onClick={handleNext} disabled={!selectedAnswer} className="bg-brand-blue text-white font-semibold px-6 py-2 rounded-lg hover:bg-sky-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {currentQuestionIndex === quiz.questions.length - 1 ? 'Submit' : 'Next'}
              </button>
          </footer>
        )}
      </div>
    </div>
  );
};

export default QuizModal;
