
import React, { useState, useRef } from 'react';
import { UserProfile } from '../types';
import { Icons } from '../constants';

interface ProfileModalProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ profile, onSave, onClose }) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [avatar, setAvatar] = useState(profile.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, email, avatar });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-orange-100 dark:border-orange-900/30">
        <div className="bg-orange-500 p-6 flex items-center justify-between">
          <h3 className="text-white font-spiritual text-xl">Divine Identity</h3>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <form onSubmit={handleSave} className="p-8 space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-orange-100 dark:border-orange-900/30 bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-orange-300"><Icons.User /></div>
                )}
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-[10px] font-bold uppercase tracking-widest">Change</span>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />
            </div>
            <p className="text-[10px] text-orange-400 mt-2 font-bold uppercase tracking-widest">Avatar of the Soul</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-orange-400 dark:text-orange-500 uppercase tracking-widest mb-2">Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-orange-50 dark:bg-zinc-800 border border-orange-100 dark:border-orange-900/30 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-orange-400 dark:text-orange-500 uppercase tracking-widest mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-orange-50 dark:bg-zinc-800 border border-orange-100 dark:border-orange-900/30 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all dark:text-white"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg active:scale-95"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
