import React from 'react';
import { MessageSquare, Trash2 } from 'lucide-react';
import { ChatSession } from '../../types/chat';

interface ChatListProps {
  sessions: ChatSession[];
  currentSessionId: string;
  onSelectSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
}

export const ChatList: React.FC<ChatListProps> = ({
  sessions,
  currentSessionId,
  onSelectSession,
  onDeleteSession,
}) => {
  return (
    <div className="space-y-2">
      {sessions.map((session) => (
        <div
          key={session.id}
          className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 group hover:bg-blue-400/10 ${
            currentSessionId === session.id ? 'bg-blue-400/20' : 'bg-blue-900/10'
          }`}
          onClick={() => onSelectSession(session.id)}
        >
          <div className="flex items-center space-x-3 truncate">
            <MessageSquare size={18} className="text-blue-400" />
            <span className="text-blue-100 truncate">{session.title}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteSession(session.id);
            }}
            className="opacity-0 group-hover:opacity-100 text-blue-400 hover:text-red-400 transition-opacity duration-200"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}