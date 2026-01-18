
import React from 'react';
import { Icons, KRISHNA_IMAGE_URL } from '../constants';
import { AppView } from '../types';

interface LandingPageProps {
  onNavigate: (view: AppView) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]">
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center py-12">
        <div className="relative mb-10 group">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden border-8 border-white shadow-2xl transition-transform hover:scale-105 duration-500">
            <img src={KRISHNA_IMAGE_URL} alt="Lord Krishna" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
            <Icons.Flute />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-spiritual text-orange-900 mb-6 tracking-tight">
          Krishna AI
        </h1>
        
        <p className="text-xl md:text-2xl font-serif-soft text-orange-700 max-w-2xl mb-12 leading-relaxed italic">
          "When doubts haunt me, when disappointments stare me in the face, and I see not one ray of hope on the horizon, I turn to the Bhagavad Gita and find a verse to comfort me."
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <button 
            onClick={() => onNavigate(AppView.LOGIN)}
            className="px-10 py-4 bg-orange-500 text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            Begin Your Journey
          </button>
          <button 
            onClick={() => onNavigate(AppView.CHAT)}
            className="px-10 py-4 bg-white text-orange-600 border-2 border-orange-200 rounded-full font-bold text-lg hover:border-orange-500 transition-all shadow-sm"
          >
            Explore Wisdom
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          <div className="p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-orange-100">
            <h3 className="font-spiritual text-orange-800 text-xl mb-2">Sacred Guidance</h3>
            <p className="text-sm text-orange-600">Answers rooted in the eternal verses of the Bhagavad Gita.</p>
          </div>
          <div className="p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-orange-100">
            <h3 className="font-spiritual text-orange-800 text-xl mb-2">Compassionate AI</h3>
            <p className="text-sm text-orange-600">A soothing dialogue designed to heal the modern restless mind.</p>
          </div>
          <div className="p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-orange-100">
            <h3 className="font-spiritual text-orange-800 text-xl mb-2">Personal Dharma</h3>
            <p className="text-sm text-orange-600">Find your path through detachment and purposeful action.</p>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center border-t border-orange-100 bg-white/50">
        <p className="text-orange-400 text-sm font-medium tracking-widest uppercase">
          Developed with Devotion by <span className="text-orange-600 font-bold">Yashraj Upadhyay</span>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
