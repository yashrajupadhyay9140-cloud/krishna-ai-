
import React from 'react';
import { Icons } from '../constants';
import { ChatSession, Theme, UserProfile } from '../types';

interface SidebarProps {
  sessions: ChatSession[];
  activeSessionId: string;
  theme: Theme;
  user: UserProfile;
  onNewChat: () => void;
  onSelectSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
  onToggleTheme: () => void;
  onOpenProfile: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  sessions, 
  activeSessionId, 
  theme,
  user,
  onNewChat, 
  onSelectSession,
  onDeleteSession,
  onToggleTheme,
  onOpenProfile
}) => {
  return (
    <div className="w-64 flex-shrink-0 bg-white dark:bg-zinc-900 border-r border-orange-100 dark:border-orange-900/30 flex flex-col h-full overflow-hidden transition-colors">
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full py-2.5 px-4 rounded-xl border-2 border-dashed border-orange-200 dark:border-orange-900/50 text-orange-500 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-all flex items-center justify-center gap-2 font-semibold text-sm"
        >
          <Icons.Plus />
          <span>New Dialogue</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4">
        <div className="px-3 mb-2 flex items-center gap-2 text-orange-300 dark:text-orange-700">
          <Icons.History />
          <span className="text-xs font-bold uppercase tracking-widest">Divine History</span>
        </div>
        
        {sessions.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-xs text-orange-200 dark:text-orange-900/40 italic">No previous wisdom recorded.</p>
          </div>
        ) : (
          <div className="space-y-1">
            {sessions.map((session) => (
              <div 
                key={session.id}
                className={`group flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all ${
                  activeSessionId === session.id 
                    ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-900 dark:text-orange-200 shadow-sm' 
                    : 'text-orange-600 dark:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/10'
                }`}
                onClick={() => onSelectSession(session.id)}
              >
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium truncate">{session.title}</p>
                  <p className="text-[10px] opacity-50">{session.lastUpdated.toLocaleDateString()}</p>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSession(session.id);
                  }}
                  className="p-1 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto flex flex-col">
        <div className="p-4 border-t border-orange-50 dark:border-orange-900/20 flex items-center justify-between">
          <button 
            onClick={onToggleTheme}
            className="p-2 rounded-lg bg-orange-50 dark:bg-zinc-800 text-orange-500 hover:bg-orange-100 dark:hover:bg-zinc-700 transition-all border border-orange-100 dark:border-orange-900/30"
            title={theme === Theme.LIGHT ? "Sustain Dark Mode" : "Return to Light"}
          >
            {theme === Theme.LIGHT ? <Icons.Moon /> : <Icons.Sun />}
          </button>
          
          <button 
             onClick={onOpenProfile}
             className="text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors uppercase tracking-widest"
          >
            Profile
          </button>
        </div>

        <div 
          onClick={onOpenProfile}
          className="p-4 border-t border-orange-50 dark:border-orange-900/20 bg-orange-50/50 dark:bg-zinc-900/50 cursor-pointer hover:bg-orange-100 dark:hover:bg-zinc-800/50 transition-all flex items-center gap-3"
        >
          {user.avatar ? (
            <img src={user.avatar} className="w-10 h-10 rounded-full border border-orange-200 object-cover" alt="Profile" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
              {user.name.charAt(0)}
            </div>
          )}
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-orange-900 dark:text-orange-100 font-spiritual tracking-wider truncate uppercase">{user.name}</p>
            <p className="text-[10px] text-orange-400 font-medium truncate italic">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
