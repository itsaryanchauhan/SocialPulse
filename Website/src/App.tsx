import React, { useEffect } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ChatHeader } from './components/ChatHeader';
import { useChat } from './hooks/useChat';
import { Sparkles } from 'lucide-react';
import './styles/glassmorphism.css';

function App() {
  const {
    sessions,
    currentSessionId,
    currentSession,
    isLoading,
    error,
    sendMessage,
    setCurrentSessionId,
    createNewSession,
    deleteSession,
    messageEndRef,
  } = useChat();

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentSession?.messages]);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950">
      <Sidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        onNewChat={createNewSession}
        onSelectSession={setCurrentSessionId}
        onDeleteSession={deleteSession}
      />
      
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <ChatHeader />
        
        <div className="flex-1 glass rounded-3xl p-6 mt-4 overflow-hidden mb-4">
          <div className="h-full overflow-y-auto space-y-4 scrollbar-thin">
            {!currentSession?.messages.length ? (
              <div className="flex flex-col items-center justify-center h-full text-blue-300/60">
                <Sparkles size={48} className="mb-4 text-blue-400" />
                <p>Start a conversation with the AI</p>
              </div>
            ) : (
              currentSession.messages.map((message, index) => (
                <ChatMessage key={message.id} message={message} />
              ))
            )}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/20 text-red-200 text-center">
                {error}
              </div>
            )}
            <div ref={messageEndRef} />
          </div>
        </div>
        
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}

export default App;