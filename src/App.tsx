
import React, { useState } from 'react';
import { LESSONS } from './constants';
import Syllabus from './components/Syllabus';
import LessonContent from './components/LessonContent';
import { EcodeLogoIcon } from './components/Icons';

function App() {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const currentLesson = LESSONS[currentLessonIndex];

  return (
    <div className="min-h-screen bg-brand-dark font-sans flex flex-col">
      <header className="bg-brand-dark/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-20 shadow-lg shadow-brand-blue/10">
        <nav className="container mx-auto px-4 lg:px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <EcodeLogoIcon className="h-10 w-10 text-brand-light-blue" />
            <span className="text-xl font-bold text-slate-100 tracking-wider">Ecode Technology</span>
          </div>
          <div className="hidden md:block">
            <span className="text-slate-400 font-medium">Course: Introduction to Modern AI</span>
          </div>
        </nav>
      </header>
      
      <main className="flex-grow container mx-auto px-4 lg:px-6 py-8 flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4 lg:max-w-xs shrink-0">
          <Syllabus
            lessons={LESSONS}
            currentLessonIndex={currentLessonIndex}
            onSelectLesson={setCurrentLessonIndex}
          />
        </aside>
        
        <div className="flex-grow min-w-0">
          <LessonContent key={currentLessonIndex} lesson={currentLesson} />
        </div>
      </main>

       <footer className="text-center py-4 border-t border-slate-800 text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Ecode Technology. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
