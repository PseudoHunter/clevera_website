import React from 'react';
import { PageRoute } from '../types';
import { HelpCircle, ArrowLeft, Home, BookOpen, FileCheck } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
        <HelpCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-blue-600 uppercase">
          Error 404 &bull; Page Not Found
        </span>
        <h1 className="text-3xl font-black text-slate-900 font-sans">
          We couldn't find the corporate training page you requested.
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          The link may have moved or the training URL may have changed. Please use the quick links below to locate our programs.
        </p>
      </div>

      <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => onNavigate('home')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </button>
        <button
          onClick={() => onNavigate('modules')}
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          <span>Browse Modules Catalog</span>
        </button>
      </div>
    </div>
  );
};
