import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiSend, FiTrash2, FiArrowLeft, FiMessageCircle } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const ChatWithAI = () => {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history
  useEffect(() => {
    const loadChatHistory = async () => {
      if (!token) {
        setInitialLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/chat/messages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMessages(data.messages || []);
        }
      } catch (err) {
        console.error("Error loading chat history:", err);
      } finally {
        setInitialLoading(false);
      }
    };

    loadChatHistory();
  }, [token]);

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim() || loading) {
      return;
    }

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/chat/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      const data = await response.json();
      
      // Add both user and AI messages
      setMessages((prev) => [
        ...prev,
        data.user_message,
        data.ai_message,
      ]);
    } catch (err) {
      console.error("Error sending message:", err);
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Clear chat history
  const handleClearChat = async () => {
    if (!window.confirm("Are you sure you want to clear your chat history?")) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/chat/clear`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessages([]);
        setError("");
      }
    } catch (err) {
      console.error("Error clearing chat:", err);
      setError("Failed to clear chat history.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C7A60] to-[#0A5A46] py-6">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/buyer-dashboard"
              className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-white transition hover:bg-white/20"
            >
              <FiArrowLeft />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/20 p-3">
                <FiMessageCircle className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Chat with Eco AI</h1>
                <p className="text-sm text-emerald-100">
                  Ask me anything about sustainability and eco-friendly living!
                </p>
              </div>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={handleClearChat}
              className="flex items-center gap-2 rounded-lg bg-red-500/80 px-4 py-2 text-white transition hover:bg-red-600"
            >
              <FiTrash2 />
              <span>Clear Chat</span>
            </button>
          )}
        </div>

        {/* Chat Container */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Messages Area */}
          <div className="h-[500px] overflow-y-auto p-6">
            {initialLoading ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
                  <p className="text-gray-500">Loading chat...</p>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 rounded-full bg-emerald-50 p-6">
                  <FiMessageCircle className="text-5xl text-emerald-600" />
                </div>
                <h2 className="mb-2 text-xl font-semibold text-gray-800">
                  Welcome to Eco AI Chat!
                </h2>
                <p className="mb-4 max-w-md text-gray-600">
                  I'm here to help you with questions about sustainability, eco-friendly
                  products, recycling, and green living. Ask me anything!
                </p>
                <div className="mt-4 grid gap-2">
                  <button
                    onClick={() =>
                      setInputMessage("What are the benefits of buying secondhand items?")
                    }
                    className="rounded-lg bg-emerald-50 px-4 py-2 text-sm text-emerald-700 transition hover:bg-emerald-100"
                  >
                    What are the benefits of buying secondhand items?
                  </button>
                  <button
                    onClick={() =>
                      setInputMessage("How can I reduce my carbon footprint?")
                    }
                    className="rounded-lg bg-emerald-50 px-4 py-2 text-sm text-emerald-700 transition hover:bg-emerald-100"
                  >
                    How can I reduce my carbon footprint?
                  </button>
                  <button
                    onClick={() =>
                      setInputMessage("What is circular economy?")
                    }
                    className="rounded-lg bg-emerald-50 px-4 py-2 text-sm text-emerald-700 transition hover:bg-emerald-100"
                  >
                    What is circular economy?
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-[#0C7A60] text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </p>
                      <p
                        className={`mt-2 text-xs ${
                          message.role === "user" ? "text-emerald-100" : "text-gray-500"
                        }`}
                      >
                        {new Date(message.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="max-w-[75%] rounded-2xl bg-gray-100 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 delay-100"></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="border-t border-red-100 bg-red-50 px-6 py-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Input Area */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-gray-200 bg-gray-50 p-4"
          >
            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about sustainability, recycling, eco-products..."
                className="flex-1 rounded-full border border-gray-300 px-6 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !inputMessage.trim()}
                className="flex items-center gap-2 rounded-full bg-[#0C7A60] px-6 py-3 text-white transition hover:bg-[#0A5A46] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FiSend />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-6 rounded-2xl bg-white/10 p-4 text-white">
          <h3 className="mb-2 font-semibold">!!! Tips for better answers:</h3>
          <ul className="space-y-1 text-sm text-emerald-50">
            <li>• Be specific in your questions</li>
            <li>• Ask about sustainable materials, recycling, or eco-practices</li>
            <li>• Get tips on reducing waste and carbon footprint</li>
            <li>• Learn about circular economy concepts</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatWithAI;
