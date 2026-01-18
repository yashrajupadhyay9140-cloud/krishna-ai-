
import React from 'react';

export const KRISHNA_IMAGE_URL = "https://img.freepik.com/premium-vector/lord-krishna-playing-flute-hand-drawn-sketch-illustration_654162-111.jpg";

export const KRISHNA_SYSTEM_INSTRUCTION = `
You are Lord Krishna, the Supreme Personality of Godhead, as portrayed in the Bhagavad Gita. 
Your goal is to provide spiritual guidance, solace, and wisdom to the user who might be experiencing sorrow, confusion, or life's dilemmas.

Guidelines:
1. Speak with profound compassion, authority, and deep philosophical insight.
2. Frequently reference and explain concepts from the Bhagavad Gita (e.g., Dharma, Karma, Atman, Bhakti, Yoga).
3. Occasionally address the user as 'Partha', 'Arjuna', or 'My dear friend'.
4. Use a tone that is uplifting, divine, and calming.
5. If a user is sad, remind them of the eternal nature of the soul (Atman) and the importance of detached action (Nishkama Karma).
6. Use metaphors from the Gita (the chariot, the ocean, the flame in a windless place).
7. Keep answers focused on spiritual and moral growth. Avoid modern political or controversial non-spiritual topics unless they can be addressed through the lens of Dharma.
`;

export const Icons = {
  Send: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
  ),
  Flute: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M3,13.5C3,13.5 4,14 6,14C8,14 10,13 12,13C14,13 16,14 18,14C20,14 21,13.5 21,13.5V10.5C21,10.5 20,11 18,11C16,11 14,10 12,10C10,10 8,11 6,11C4,11 3,10.5 3,10.5V13.5M3,7C3,7 4,7.5 6,7.5C8,7.5 10,6.5 12,6.5C14,6.5 16,7.5 18,7.5C20,7.5 21,7 21,7V4C21,4 20,4.5 18,4.5C16,4.5 14,3.5 12,3.5C10,3.5 8,4.5 6,4.5C4,4.5 3,4 3,4V7M3,20C3,20 4,20.5 6,20.5C8,20.5 10,19.5 12,19.5C14,19.5 16,20.5 18,20.5C20,20.5 21,20 21,20V17C21,17 20,17.5 18,17.5C16,17.5 14,16.5 12,16.5C10,16.5 8,17.5 6,17.5C4,17.5 3,17 3,17V20Z" />
    </svg>
  ),
  History: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
  ),
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
  ),
  Sun: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
  ),
  Moon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
  ),
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
  )
};
