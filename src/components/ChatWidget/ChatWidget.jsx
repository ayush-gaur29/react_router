import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Droplet,
  Loader2,
  Trash2,
  Minimize2
} from "lucide-react";
import { API_URL } from "../../config";

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I am your RedRoute Medical Assistant 🩸. Feel free to ask anything about blood donation eligibility, compatibility, or preparation guidelines."
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "Who can receive O+ blood?",
    "How often can I donate blood?",
    "What should I eat before donating?",
    "Can I donate if I have a tattoo?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const query = typeof textToSend === "string" ? textToSend : input;
    if (!query.trim() || loading) return;

    const userMessage = { role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/chat`, {
        message: query,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an issue reaching the server. Please try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat reset. How can I help you today regarding blood donation? 🩸"
      }
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 select-none">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[92vw] sm:w-96 h-[520px] max-h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200/90"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-700 via-red-600 to-rose-700 text-white p-4 flex items-center justify-between shadow-sm shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-white backdrop-blur-sm shadow-inner">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm">RedRoute AI Assistant</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  <p className="text-[11px] text-red-100 font-medium">Groq LLaMA-Powered Medical Guide</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearChat}
                  title="Clear conversation"
                  className="p-1.5 rounded-xl hover:bg-white/20 text-red-100 hover:text-white transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-1.5 rounded-xl hover:bg-white/20 text-red-100 hover:text-white transition cursor-pointer"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-xl bg-red-100 text-red-700 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Droplet className="w-3.5 h-3.5 fill-red-700" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-tr-xs font-medium"
                        : "bg-white border border-slate-200/80 text-slate-800 rounded-tl-xs"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing Wave Animation */}
              {loading && (
                <div className="flex items-center gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                    <Droplet className="w-3.5 h-3.5 fill-red-700" />
                  </div>
                  <div className="bg-white border border-slate-200/80 px-4 py-3 rounded-2xl rounded-tl-xs flex items-center gap-1.5 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips (show when few messages) */}
            {messages.length <= 2 && !loading && (
              <div className="px-3 py-2 bg-slate-50 border-t border-slate-200/60 overflow-x-auto flex gap-1.5 scrollbar-none">
                {quickPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt)}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-slate-600 hover:text-red-700 hover:border-red-200 hover:bg-red-50/50 transition shrink-0 cursor-pointer shadow-2xs"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Box */}
            <div className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about blood donation..."
                className="flex-1 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="p-2.5 rounded-2xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white shadow-md shadow-red-600/20 transition cursor-pointer shrink-0"
                aria-label="Send message"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2.5 px-4 py-3.5 bg-gradient-to-r from-red-600 via-red-600 to-rose-600 text-white rounded-full shadow-2xl shadow-red-600/40 hover:shadow-red-600/60 border border-white/20 transition cursor-pointer"
            aria-label="Open AI Assistant"
          >
            <div className="relative">
              <Bot className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-red-600"></span>
            </div>
            <span className="text-xs font-bold tracking-wide pr-1 hidden sm:inline">
              Ask AI Assistant 🩸
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChatWidget;