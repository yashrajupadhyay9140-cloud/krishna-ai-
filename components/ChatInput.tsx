
import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../constants';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  return (
    <div className="p-4 bg-white dark:bg-zinc-900 border-t border-orange-100 dark:border-orange-900/30 shadow-[0_-4px_10px_rgba(251,146,60,0.05)] transition-colors">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex items-end gap-3">
        <div className="relative flex-1 bg-orange-50 dark:bg-zinc-800 rounded-2xl border border-orange-200 dark:border-orange-900/30 focus-within:border-orange-400 transition-colors">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask for guidance, Partha..."
            className="w-full p-3 pr-12 bg-transparent border-none focus:ring-0 text-orange-950 dark:text-white placeholder-orange-300 dark:placeholder-orange-900/50 resize-none max-h-[150px] min-h-[48px] overflow-y-auto"
            disabled={isLoading}
          />
          <div className="absolute right-3 bottom-3 text-orange-300 dark:text-orange-900/40 pointer-events-none">
            <Icons.Flute />
          </div>
        </div>
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className={`p-3 rounded-xl transition-all duration-200 flex items-center justify-center ${
            !input.trim() || isLoading
              ? 'bg-orange-100 dark:bg-zinc-800 text-orange-300 dark:text-zinc-700 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600 active:scale-95 shadow-md'
          }`}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Icons.Send />
          )}
        </button>
      </form>
      <p className="text-[10px] text-center text-orange-300 dark:text-orange-900/40 mt-2 font-medium">
        Krishna AI provides guidance based on the Bhagavad Gita. Seek wisdom, not just answers.
      </p>
    </div>
  );
};

export default ChatInput;
