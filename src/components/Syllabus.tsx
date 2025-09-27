import React from 'react';
import { Lesson } from '../types';
import { BookOpenIcon, ClockIcon, CheckCircleIcon } from './Icons';

interface SyllabusProps {
  lessons: Lesson[];
  currentLessonIndex: number;
  onSelectLesson: (index: number) => void;
}

const Syllabus: React.FC<SyllabusProps> = ({ lessons, currentLessonIndex, onSelectLesson }) => {
  return (
    <div className="bg-brand-secondary/30 border border-slate-700/80 rounded-lg p-6 shadow-md sticky top-24">
      <div className="flex items-center gap-3 mb-6">
        <BookOpenIcon className="w-6 h-6 text-brand-light-blue" />
        <h2 className="text-xl font-bold text-white">Course Syllabus</h2>
      </div>
      
      <div className="space-y-3">
        {lessons.map((lesson, index) => (
          <button
            key={lesson.id}
            onClick={() => onSelectLesson(index)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 group ${
              index === currentLessonIndex
                ? 'border-brand-blue bg-brand-blue/20 shadow-lg shadow-brand-blue/20'
                : 'border-slate-600 hover:border-brand-blue/50 bg-slate-800/50 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-grow min-w-0">
                <h3 className={`font-semibold text-sm mb-2 line-clamp-2 ${
                  index === currentLessonIndex ? 'text-brand-light-blue' : 'text-slate-200 group-hover:text-brand-light-blue'
                }`}>
                  {lesson.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ClockIcon className="w-3 h-3" />
                  <span>{lesson.duration} min</span>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                {index < currentLessonIndex ? (
                  <CheckCircleIcon className="w-5 h-5 text-green-500" />
                ) : index === currentLessonIndex ? (
                  <div className="w-5 h-5 rounded-full bg-brand-blue flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-500 group-hover:border-brand-blue transition-colors" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-700">
        <div className="text-xs text-slate-400">
          <p>Progress: {currentLessonIndex + 1} of {lessons.length} lessons</p>
          <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
            <div 
              className="bg-gradient-to-r from-brand-blue to-brand-light-blue h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentLessonIndex + 1) / lessons.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Syllabus;