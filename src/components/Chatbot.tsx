import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MISTRAL_CONFIG } from '../config/mistral'
import { useTheme } from './theme-provider'
import { useToast } from './ui/use-toast'

// Types
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Sample bot responses
const BOT_RESPONSES = [
  "Our AI forecasting tools can predict SAF prices up to 12 months in advance with 95% accuracy.",
  "Aeronomy's platform helps airlines reduce SAF procurement costs by 15-20%.",
  "Our dynamic hedging solutions help stabilize fuel costs by sharing risk with trusted SAF producers.",
  "You can request a demo by clicking the 'Request Demo' button in the navigation bar.",
  "Our ABS financing solutions transform future SAF purchases into immediate working capital.",
  "I'd be happy to connect you with our team to discuss your specific SAF procurement needs."
];

// ChatButton Component
const ChatButton = ({ isOpen, toggleChat }: { isOpen: boolean; toggleChat: () => void }) => (
  <motion.button
    className="fixed bottom-6 right-6 bg-sustainability text-white p-4 rounded-full shadow-lg hover:bg-sustainability/90 transition-colors z-50"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={toggleChat}
  >
    {isOpen ? (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ) : (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    )}
  </motion.button>
);

// ChatHeader Component
const ChatHeader = ({ setIsOpen }: { setIsOpen: (value: boolean) => void }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
    <h3 className="text-lg font-semibold text-navy dark:text-white">Chat with Laura</h3>
    <button
      onClick={() => setIsOpen(false)}
      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
);

// MessageBubble Component
const MessageBubble = ({ message, theme }: { message: Message; theme: string }) => (
  <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div 
      className={`max-w-[80%] p-3 rounded-lg ${
        message.role === 'user' 
          ? 'bg-sustainability text-white rounded-br-none' 
          : `${theme === 'dark' ? 'bg-dark-card text-gray-200' : 'bg-gray-100 text-gray-800'} rounded-bl-none`
      }`}
    >
      <p className="text-sm">{message.content}</p>
      <span className="text-xs opacity-70 mt-1 block">
        {message.timestamp.toLocaleTimeString()}
      </span>
    </div>
  </div>
);

// Main Chatbot Component
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { toast } = useToast();
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      console.log('Sending request to Mistral API...');
      const requestBody = {
        model: MISTRAL_CONFIG.MODEL,
        messages: [
          { role: 'system', content: MISTRAL_CONFIG.SYSTEM_PROMPT },
          ...messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          { role: userMessage.role, content: userMessage.content }
        ],
        temperature: MISTRAL_CONFIG.TEMPERATURE,
        max_tokens: 1000
      };

      console.log('Request body:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(MISTRAL_CONFIG.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MISTRAL_CONFIG.API_KEY}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API Error Response:', errorData);
        throw new Error(`API request failed: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error details:', error);
      toast({
        title: "Error",
        description: "I apologize, but I encountered an error. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ChatButton isOpen={isOpen} toggleChat={() => setIsOpen(!isOpen)} />
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-24 right-6 w-96 ${theme === 'dark' ? 'bg-dark-surface' : 'bg-white'} rounded-xl shadow-2xl overflow-hidden z-50`}
          >
            <ChatHeader setIsOpen={setIsOpen} />
            
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <MessageBubble key={index} message={message} theme={theme} />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className={`p-3 rounded-lg rounded-bl-none ${theme === 'dark' ? 'bg-dark-card' : 'bg-gray-100'}`}>
                    <div className="flex space-x-2">
                      <div className={`w-2 h-2 ${theme === 'dark' ? 'bg-gray-500' : 'bg-gray-400'} rounded-full animate-bounce`}></div>
                      <div className={`w-2 h-2 ${theme === 'dark' ? 'bg-gray-500' : 'bg-gray-400'} rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
                      <div className={`w-2 h-2 ${theme === 'dark' ? 'bg-gray-500' : 'bg-gray-400'} rounded-full animate-bounce`} style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSubmit} className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e as unknown as React.FormEvent);
                    }
                  }}
                  placeholder="Type your message..."
                  className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sustainability ${
                    theme === 'dark'
                      ? 'bg-dark-card border-gray-700 text-white'
                      : 'bg-white border-gray-200 text-gray-900'
                  }`}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-sustainability text-white px-4 py-2 rounded-lg hover:bg-sustainability/90 transition-colors"
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot; 