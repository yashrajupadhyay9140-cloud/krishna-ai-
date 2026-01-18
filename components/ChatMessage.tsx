
import React from 'react';
import { Message, Role } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isKrishna = message.role === Role.KRISHNA;

  return (
    <div className={`flex w-full mb-6 ${isKrishna ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 shadow-sm border ${
        isKrishna 
          ? 'bg-white dark:bg-zinc-900 border-orange-100 dark:border-orange-900/30 text-orange-950 dark:text-orange-50' 
          : 'bg-orange-500 border-orange-600 text-white'
      }`}>
        {isKrishna && (
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-950 flex items-center justify-center border border-orange-200 dark:border-orange-900/30">
              <span className="text-orange-600 dark:text-orange-400 font-bold text-xs">K</span>
            </div>
            <span className="text-xs font-spiritual font-bold text-orange-800 dark:text-orange-500 tracking-wider">LORD KRISHNA</span>
          </div>
        )}
        <div className={`text-sm md:text-base leading-relaxed whitespace-pre-wrap ${isKrishna ? 'font-serif-soft' : ''}`}>
          {message.content}
        </div>
        <div className={`text-[10px] mt-2 opacity-60 ${isKrishna ? 'text-orange-400 dark:text-orange-600' : 'text-orange-100'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
