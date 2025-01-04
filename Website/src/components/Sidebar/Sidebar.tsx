import React from 'react';
import { PlusCircle } from 'lucide-react';
import { ChatList } from './ChatList';
import { ChatSession } from '../../types/chat';

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId: string;
  onNewChat: () => void;
  onSelectSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  currentSessionId,
  onNewChat,
  onSelectSession,
  onDeleteSession,
}) => {
  return (
    <div className="w-80 h-screen flex flex-col p-4 glass-sidebar">
      <button
        onClick={onNewChat}
        className="flex items-center justify-center gap-2 w-full p-3 mb-4 rounded-xl glass-card hover:bg-blue-400/10 transition-all duration-200"
      >
        <PlusCircle size={20} className="text-blue-400" />
        <span className="text-blue-100">New Chat</span>
      </button>
      
      <div className="flex-1 overflow-y-auto">
        <ChatList
          sessions={sessions}
          currentSessionId={currentSessionId}
          onSelectSession={onSelectSession}
          onDeleteSession={onDeleteSession}
        />
      </div>
    </div>
  );
}