
import { useState, useEffect } from 'react';
import ChatInterface from "@/components/chat/ChatInterface";
import ChatHomeScreen from "@/components/chat/ChatHomeScreen";
import AllChatsScreen from "@/components/chat/AllChatsScreen";
import WelcomeScreen from "@/components/home/WelcomeScreen";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import ConfessionFlow from "@/components/confession/ConfessionFlow";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { Navigate } from "react-router-dom";
import ProfileSection from "@/components/profile/ProfileSection";

const Index = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "My child, welcome to this sacred space. I am here as your spiritual guide to provide religious counsel through the teachings of our Lord Jesus Christ. How may I assist you in your walk with God today?", isUser: false }
  ]);
  const [activeTab, setActiveTab] = useState('home');
  const [showWelcome, setShowWelcome] = useState(true);
  const [showChatHome, setShowChatHome] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();
  const [showAllChats, setShowAllChats] = useState(false);

  const handleSendMessage = async (initialMessage?: string) => {
    const messageToSend = initialMessage || message;
    if (!messageToSend.trim() || !user) return;
    
    setMessages(prev => [...prev, { text: messageToSend, isUser: true }]);
    setMessage('');
    setShowChatHome(false);
    setShowAllChats(false); // Make sure to hide the all chats screen

    try {
      await supabase.from('chat_history').insert([
        { message: messageToSend, is_user_message: true, user_id: user.id }
      ]);

      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: { message: messageToSend },
      });

      if (error) throw error;
      
      const aiResponse = data.response;
      setMessages(prev => [...prev, { text: aiResponse, isUser: false }]);

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGetStarted = (screen: string = 'forgive') => {
    setShowWelcome(false);
    setActiveTab(screen);
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'home') {
      setShowWelcome(true);
      setActiveTab('home');
    } else if (tab === 'chat') {
      setShowWelcome(false);
      setShowChatHome(true);
      setActiveTab('chat');
    } else {
      setShowWelcome(false);
      setActiveTab(tab);
    }
  };

  const handleBack = () => {
    setShowChatHome(true);
    setMessages([
      { text: "My child, welcome to this sacred space. I am here as your spiritual guide to provide religious counsel through the teachings of our Lord Jesus Christ. How may I assist you in your walk with God today?", isUser: false }
    ]);
  };

  const handleNavigateToHome = () => {
    setShowWelcome(true);
    setActiveTab('home');
  };

  const handleViewAllChats = () => {
    setShowAllChats(true);
  };

  const handleBackFromAllChats = () => {
    setShowAllChats(false);
  };

  const handleChatSelect = (selectedMessage: string) => {
    handleSendMessage(selectedMessage);
  };

  if (!user) {
    return <Navigate to="/auth" />;
  }

  if (showWelcome) {
    return (
      <WelcomeScreen 
        onGetStarted={handleGetStarted}
        renderBottomNavigation={() => (
          <BottomNavigation 
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        )}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#242424]">
      {activeTab === 'chat' ? (
        showAllChats ? (
          <AllChatsScreen 
            onBack={handleBackFromAllChats}
            onChatSelect={handleChatSelect}
          />
        ) : showChatHome ? (
          <ChatHomeScreen 
            onStartChat={handleSendMessage} 
            messages={messages}
            onBack={handleNavigateToHome}
            onViewAllChats={handleViewAllChats}
          />
        ) : (
          <ChatInterface
            messages={messages}
            message={message}
            onMessageChange={setMessage}
            onSendMessage={() => handleSendMessage()}
            onBack={handleBack}
          />
        )
      ) : activeTab === 'profile' ? (
        <ProfileSection />
      ) : (
        <>
          <div className="flex-1 p-4 pb-20">
            <div className="max-w-lg mx-auto">
              {activeTab === 'forgive' && (
                <ConfessionFlow 
                  onNavigateToChat={() => handleTabChange('chat')}
                />
              )}
            </div>
          </div>
          <BottomNavigation 
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </>
      )}
    </div>
  );
};

export default Index;
