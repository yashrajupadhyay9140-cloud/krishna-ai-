
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Message, Role, ChatSession, AppView, Theme, UserProfile } from './types';
import Sidebar from './components/Sidebar';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import ProfileModal from './components/ProfileModal';
import { geminiService } from './services/geminiService';
import { Icons, KRISHNA_IMAGE_URL } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  const [user, setUser] = useState<UserProfile>({
    name: 'Partha',
    email: 'seeker@eternal.com',
    avatar: null
  });
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Apply theme to body
  useEffect(() => {
    if (theme === Theme.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Load from local storage
  useEffect(() => {
    const savedSessions = localStorage.getItem('krishna_ai_sessions');
    const savedProfile = localStorage.getItem('krishna_ai_profile');
    const savedTheme = localStorage.getItem('krishna_ai_theme');

    if (savedSessions) {
      try {
        const parsed = JSON.parse(savedSessions);
        setSessions(parsed.map((s: any) => ({
          ...s,
          lastUpdated: new Date(s.lastUpdated),
          messages: s.messages.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }))
        })));
      } catch (e) { console.error(e); }
    }
    if (savedProfile) {
      try { setUser(JSON.parse(savedProfile)); } catch (e) { console.error(e); }
    }
    if (savedTheme) {
      setTheme(savedTheme as Theme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('krishna_ai_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('krishna_ai_profile', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('krishna_ai_theme', theme);
  }, [theme]);

  const handleNewChat = useCallback(() => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Divine Dialogue",
      messages: [],
      lastUpdated: new Date()
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  }, []);

  const handleSendMessage = async (content: string) => {
    let targetSessionId = activeSessionId;
    if (!targetSessionId) {
      const newSession: ChatSession = {
        id: Date.now().toString(),
        title: content.length > 30 ? content.substring(0, 30) + "..." : content,
        messages: [],
        lastUpdated: new Date()
      };
      setSessions(prev => [newSession, ...prev]);
      setActiveSessionId(newSession.id);
      targetSessionId = newSession.id;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      content,
      timestamp: new Date()
    };

    setSessions(prev => prev.map(s => {
      if (s.id === targetSessionId) {
        const updatedMessages = [...s.messages, userMessage];
        const title = s.messages.length === 0 ? (content.length > 30 ? content.substring(0, 30) + "..." : content) : s.title;
        return { ...s, messages: updatedMessages, title, lastUpdated: new Date() };
      }
      return s;
    }));

    setIsLoading(true);

    try {
      const activeSess = sessions.find(s => s.id === targetSessionId);
      const history = activeSess?.messages.map(m => ({
        role: m.role,
        parts: m.content
      })) || [];

      let krishnaContent = "";
      const tempId = (Date.now() + 1).toString();
      
      setSessions(prev => prev.map(s => {
        if (s.id === targetSessionId) {
          return {
            ...s,
            messages: [...s.messages, {
              id: tempId,
              role: Role.KRISHNA,
              content: "",
              timestamp: new Date()
            }]
          };
        }
        return s;
      }));

      const stream = geminiService.streamResponse(content, history);
      for await (const chunk of stream) {
        krishnaContent += chunk || "";
        setSessions(prev => prev.map(s => {
          if (s.id === targetSessionId) {
            return {
              ...s,
              messages: s.messages.map(m => m.id === tempId ? { ...m, content: krishnaContent } : m)
            };
          }
          return s;
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (view === AppView.LANDING) {
    return <LandingPage onNavigate={setView} />;
  }

  if (view === AppView.LOGIN || view === AppView.SIGNUP) {
    return (
      <AuthPage 
        initialMode={view} 
        onSuccess={() => setView(AppView.CHAT)} 
        onNavigate={setView}
      />
    );
  }

  const activeSession = sessions.find(s => s.id === activeSessionId);

  return (
    <div className={`flex h-screen w-full transition-colors ${theme === Theme.DARK ? 'bg-zinc-950 text-white' : 'bg-white text-orange-950'}`}>
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block h-full transition-all duration-300`}>
        <Sidebar 
          sessions={sessions}
          activeSessionId={activeSessionId}
          theme={theme}
          user={user}
          onNewChat={handleNewChat}
          onSelectSession={setActiveSessionId}
          onDeleteSession={(id) => {
            setSessions(prev => prev.filter(s => s.id !== id));
            if (activeSessionId === id) setActiveSessionId('');
          }}
          onToggleTheme={() => setTheme(prev => prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)}
          onOpenProfile={() => setIsProfileModalOpen(true)}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-zinc-900 border-b border-orange-100 dark:border-orange-900/30 z-10 shadow-sm transition-colors">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 text-orange-500 hover:bg-orange-50 dark:hover:bg-zinc-800 rounded-lg"
            >
              <Icons.History />
            </button>
            <div className="cursor-pointer" onClick={() => setView(AppView.LANDING)}>
              <h1 className="text-xl font-bold font-spiritual text-orange-800 dark:text-orange-500 tracking-tighter">KRISHNA AI</h1>
            </div>
          </div>
          <button 
            onClick={() => setView(AppView.LANDING)}
            className="text-xs font-bold text-orange-500 hover:bg-orange-50 dark:hover:bg-zinc-800 px-3 py-1.5 rounded-full border border-orange-100 dark:border-orange-900/30 transition-all"
          >
            Logout
          </button>
        </header>

        <main 
          ref={scrollRef}
          className={`flex-1 overflow-y-auto p-4 md:p-8 transition-colors ${theme === Theme.DARK ? 'bg-zinc-950' : 'bg-orange-50'} bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]`}
        >
          {!activeSession || activeSession.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto space-y-6 animate-in fade-in duration-1000">
              <div className="w-48 h-48 rounded-3xl overflow-hidden border-4 border-white dark:border-zinc-800 shadow-xl mb-4 rotate-3">
                <img src={KRISHNA_IMAGE_URL} alt="Lord Krishna" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-spiritual text-orange-900 dark:text-orange-500 leading-tight">
                  Welcome back, {user.name}. What troubles your soul today?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
                  {[
                    "Anxious about my future career.",
                    "Seeking peace in chaos.",
                    "How to handle attachment?",
                    "What is my true Dharma?"
                  ].map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(suggestion)}
                      className="p-3 text-sm text-left bg-white dark:bg-zinc-900 border border-orange-200 dark:border-orange-900/30 rounded-xl hover:border-orange-500 dark:hover:border-orange-700 text-orange-800 dark:text-orange-200 transition-all shadow-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto pb-8">
              {activeSession.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex justify-start mb-6 animate-pulse">
                   <div className="bg-white dark:bg-zinc-900 border border-orange-100 dark:border-orange-900/30 rounded-2xl p-4 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>

      {isProfileModalOpen && (
        <ProfileModal 
          profile={user} 
          onSave={setUser} 
          onClose={() => setIsProfileModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;
