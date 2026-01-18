
import React, { useState } from 'react';
import { AppView } from '../types';
import { Icons } from '../constants';

interface AuthPageProps {
  initialMode: AppView.LOGIN | AppView.SIGNUP;
  onSuccess: () => void;
  onNavigate: (view: AppView) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ initialMode, onSuccess, onNavigate }) => {
  const [mode, setMode] = useState<AppView.LOGIN | AppView.SIGNUP>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth success
    onSuccess();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 p-6 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]">
      <button 
        onClick={() => onNavigate(AppView.LANDING)}
        className="absolute top-8 left-8 text-orange-500 flex items-center gap-2 font-bold hover:text-orange-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Home
      </button>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden">
        <div className="bg-orange-500 p-8 text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
             <Icons.Flute />
          </div>
          <h2 className="text-2xl font-spiritual tracking-wider">
            {mode === AppView.LOGIN ? 'Welcome back, Partha' : 'Begin Your Quest'}
          </h2>
          <p className="text-orange-100 text-sm mt-2 font-serif-soft italic">
            {mode === AppView.LOGIN 
              ? '"Perform your duty equipoised, O Arjuna."' 
              : '"One who has control over the mind is already in peace."'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
              placeholder="arjuna@kurukshetra.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-orange-50 border border-orange-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg active:scale-95"
          >
            {mode === AppView.LOGIN ? 'Sign In' : 'Create Account'}
          </button>

          <div className="text-center">
            <button 
              type="button"
              onClick={() => setMode(mode === AppView.LOGIN ? AppView.SIGNUP : AppView.LOGIN)}
              className="text-sm text-orange-600 font-medium hover:underline"
            >
              {mode === AppView.LOGIN ? "Don't have an account? Sign up" : "Already have an account? Log in"}
            </button>
          </div>
        </form>
      </div>

      <footer className="mt-12 text-orange-400 text-xs font-medium tracking-widest uppercase">
        Developed with Devotion by <span className="text-orange-600 font-bold">Yashraj Upadhyay</span>
      </footer>
    </div>
  );
};

export default AuthPage;
