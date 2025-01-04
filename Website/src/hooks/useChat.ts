import { useState, useEffect, useRef } from 'react';
import { ChatSession, Message } from '../types/chat';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storage';
import { runFlow } from "../services/langflow"

export const useChat = () => {
  const [sessions, setSessions] = useState<ChatSession[]>(() => 
    loadFromLocalStorage('chat_sessions') || []
  );
  const [currentSessionId, setCurrentSessionId] = useState<string>(() => {
    const savedSessions = loadFromLocalStorage('chat_sessions') || [];
    return savedSessions[0]?.id || '';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messageEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    saveToLocalStorage('chat_sessions', sessions);
  }, [sessions]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sessions]);

  const getCurrentSession = () => 
    sessions.find(session => session.id === currentSessionId);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    return newSession;
  };

  const updateSessionTitle = (sessionId: string, firstMessage: string) => {
    setSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          title: firstMessage.slice(0, 30) + (firstMessage.length > 30 ? '...' : ''),
          updatedAt: new Date(),
        };
      }
      return session;
    }));
  };

  const sendMessage = async (content: string) => {
    setError(null);
    const session = getCurrentSession() || createNewSession();
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    if (session.messages.length === 0) {
      updateSessionTitle(session.id, content);
    }

    setSessions(prev => prev.map(s => {
      if (s.id === session.id) {
        return {
          ...s,
          messages: [...s.messages, userMessage],
          updatedAt: new Date(),
        };
      }
      return s;
    }));

    setIsLoading(true);

    try {
      const response = await runFlow(content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setSessions(prev => prev.map(s => {
        if (s.id === session.id) {
          return {
            ...s,
            messages: [...s.messages, botMessage],
            updatedAt: new Date(),
          };
        }
        return s;
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
    if (currentSessionId === sessionId) {
      setCurrentSessionId(sessions[1]?.id || '');
    }
  };

  return {
    sessions,
    currentSessionId,
    currentSession: getCurrentSession(),
    isLoading,
    error,
    sendMessage,
    setCurrentSessionId,
    createNewSession,
    deleteSession,
    messageEndRef,
  };
};