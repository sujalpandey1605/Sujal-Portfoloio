import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { getChatbotResponse, personalInfo } from '../mock';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hi! I'm ${personalInfo.name}'s AI Assistant. I can help you learn about our services, pricing, and how we can help your business. What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      sender: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = getChatbotResponse(inputMessage);
      const botMessage = {
        sender: 'bot',
        text: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const quickActions = [
    { label: 'Services', query: 'Tell me about your services' },
    { label: 'Pricing', query: 'What is your pricing?' },
    { label: 'Contact', query: 'How can I contact you?' }
  ];

  const handleQuickAction = (query) => {
    setInputMessage(query);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full shadow-2xl shadow-cyan-500/50 flex items-center justify-center hover:scale-110 transition-transform duration-300 z-50 group"
        >
          <MessageCircle className="h-7 w-7 text-white" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a0e27] animate-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] z-50 animate-in slide-in-from-bottom-5 duration-300">
          <Card className="h-full flex flex-col bg-[#0a0e27] border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
            {/* Header */}
            <CardHeader className="border-b border-white/10 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Bot className="h-6 w-6 text-white" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0e27]"></span>
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">Sujal's AI Assistant</CardTitle>
                    <p className="text-xs text-green-400">● Online</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-white/10 text-gray-100 backdrop-blur-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-cyan-400" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-2 justify-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex gap-2 flex-wrap">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action.query)}
                    className="text-xs border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10 flex-shrink-0">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="bg-white/5 border-white/10 focus:border-cyan-500 text-white placeholder:text-gray-500"
                />
                <Button 
                  type="submit" 
                  size="icon"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/30 flex-shrink-0"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default Chatbot;