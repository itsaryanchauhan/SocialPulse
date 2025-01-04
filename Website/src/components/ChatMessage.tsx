import React from 'react';
import { Message } from '../types/chat';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.role === 'assistant';
  
  return (
    <div className={`flex gap-4 ${isBot ? 'justify-start' : 'justify-end mr-4'} mb-4 animate-fadeIn`}>
      <div className={`flex gap-3 max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isBot ? 'glass-card text-blue-400' : 'bg-blue-600/40 text-blue-100'
        }`}>
          {isBot ? <Bot size={20} /> : <User size={20} />}
        </div>
        <div className={`rounded-2xl px-5 py-3 ${
          isBot ? 'glass-card text-blue-100' : 'bg-blue-600/40 text-blue-50'
        }`}>
          {message.content}
          <div className="text-xs mt-1 opacity-50">
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};