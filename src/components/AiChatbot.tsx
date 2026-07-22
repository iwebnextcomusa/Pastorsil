import React, { useState, useRef, useEffect } from 'react';
import { Property, ChatMessage } from '../types';
import { MessageSquare, X, Send, Bot, User, Sparkles, Building2, Phone, ChevronRight, RefreshCw } from 'lucide-react';

interface AiChatbotProps {
  onSelectProperty: (property: Property) => void;
}

export const AiChatbot: React.FC<AiChatbotProps> = ({ onSelectProperty }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `Hello! I'm Pastorsil AI, your virtual Cincinnati real estate advisor. How can I assist your home search, valuation, or neighborhood exploration today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'Homes for sale in Hyde Park',
    'Tell me about Indian Hill',
    'How do I value my home?',
    'What are 2026 interest rates?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: messages.slice(-6).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text,
          })),
        }),
      });

      const data = await response.json();

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.reply || `I'd be glad to help! You can reach Pastor Sil directly at (513) 706-6312 or pastorsilcotlg@gmail.com.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedProperties: data.suggestedProperties,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `Thank you for contacting Pastorsil Real Estate! Please call Broker Pastor Sil at (513) 706-6312 for immediate assistance with Cincinnati real estate.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-gold-gradient text-slate-950 font-bold shadow-2xl shadow-amber-500/30 hover:scale-105 transition-all cursor-pointer border border-amber-300"
        >
          <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center text-amber-400">
            <Bot className="w-4 h-4" />
          </div>
          <span className="text-xs tracking-wide pr-1">Ask Pastorsil AI</span>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500" />
          </span>
        </button>
      )}

      {/* Floating Chatbot Window */}
      {isOpen && (
        <div className="glass-panel w-[92vw] sm:w-[400px] h-[520px] rounded-3xl border border-amber-500/30 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Chat Window Header */}
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gold-gradient p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <div>
                <h4 className="text-white font-serif-display font-bold text-sm flex items-center gap-1.5">
                  Pastorsil AI Assistant
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.2 rounded font-sans uppercase">
                    Gemini 3.6
                  </span>
                </h4>
                <p className="text-[10px] text-slate-400">Cincinnati Real Estate Advisor</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/60 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[82%] space-y-2`}>
                  <div
                    className={`p-3 rounded-2xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gold-gradient text-slate-950 font-medium rounded-tr-none'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Property Card recommendations embedded inside chat */}
                  {msg.suggestedProperties && msg.suggestedProperties.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                        Matching Cincinnati Properties:
                      </span>
                      {msg.suggestedProperties.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => onSelectProperty(p)}
                          className="bg-slate-900 border border-amber-500/30 hover:border-amber-400 p-2 rounded-xl flex items-center gap-2.5 cursor-pointer transition-all"
                        >
                          <img src={p.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-white font-bold truncate text-[11px]">{p.title}</div>
                            <div className="text-amber-400 text-[10px] font-semibold">
                              ${p.price ? p.price.toLocaleString() : p.rentPricePerMonth?.toLocaleString()} • {p.address.neighborhood}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}

                  <span className="text-[9px] text-slate-500 block px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 w-fit">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>Pastorsil AI is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 bg-slate-950 border-t border-slate-800 flex gap-1.5 overflow-x-auto text-[10px]">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-amber-300 whitespace-nowrap transition-all"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about Cincinnati homes, school ratings, valuation..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className="p-2 rounded-xl bg-gold-gradient text-slate-950 font-bold hover:brightness-110 disabled:opacity-40 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
