
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Copy, Check, Key } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage } from '../types';
import { askAITutor } from '../services/geminiService';
import Logo from './Logo';

interface AITutorProps {
  initialContext?: string;
  onOpenApiKey?: () => void;
}

// Simplified Code Block Component to prevent text mixing
const CodeBlock = ({ inline, className, children, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const codeString = String(children).replace(/\n$/, '');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (inline) {
    return (
      <code className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600 dark:text-pink-400 border border-gray-300 dark:border-gray-700" {...props}>
        {children}
      </code>
    );
  }

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg bg-[#282a36] text-white">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 bg-[#1e1f29] border-b border-gray-700">
        <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs font-mono font-bold text-gray-400 ml-2 uppercase">{language || 'text'}</span>
        </div>
        <button 
          onClick={handleCopy} 
          className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2 py-1 rounded"
        >
          {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
          {copied ? 'COPIED' : 'COPY'}
        </button>
      </div>
      
      {/* Content - Using standard pre/code for safety */}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed custom-scrollbar text-white">
           <code className={className} {...props}>
             {children}
           </code>
        </pre>
      </div>
    </div>
  );
};

const AITutor: React.FC<AITutorProps> = ({ initialContext, onOpenApiKey }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '# ሰላም! 👋\nእኔ የአንተ **Cipher_Teacher** ነኝ።\n\nየፈለከውን ማንኛውንም የ **Python** ወይም **Hacking** ጥያቄ መጠየቅ ትችላለህ። ለምሳሌ:\n\n```python\nprint("Hello, Hacker!")\n```\n\nእንጀምር?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare history for service (only text and role needed)
      const history = messages.map(m => ({
        role: m.role,
        text: m.text
      }));
      
      let prompt = input;
      if (initialContext && messages.length === 1) {
        prompt = `Context: The student is looking at this lesson: ${initialContext}. \n\n Question: ${input}`;
      }

      const responseText = await askAITutor(history, prompt);
      
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'ይቅርታ፣ ችግር አጋጥሟል። እባክዎ እንደገና ይሞክሩ።' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-canvas dark:bg-[#0d1117] border-l border-border dark:border-gray-800">
      <div className="p-4 border-b border-border dark:border-gray-800 bg-canvas-subtle dark:bg-[#161b22] flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 text-brand">
                <Logo />
            </div>
            <div>
                <span className="font-bold text-gray-900 dark:text-white text-sm block font-cyber">Cipher_Teacher</span>
            </div>
        </div>
        {onOpenApiKey && (
            <button 
                onClick={onOpenApiKey}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
            >
                <Key size={14} />
                <span>API Key</span>
            </button>
        )}
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 bg-canvas dark:bg-[#0d1117] scrollbar-thin">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2`}>
            {/* Avatar */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border shadow-sm ${
                msg.role === 'user' 
                ? 'bg-blue-600 border-blue-500 text-white' 
                : 'bg-[#111] border-brand/30 text-brand'
            }`}>
              {msg.role === 'user' ? <User size={18} /> : <Logo className="w-6 h-6" />}
            </div>

            {/* Message Bubble */}
            <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-md relative overflow-hidden ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white dark:bg-[#161b22] text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-tl-none'
            }`}>
              {/* Markdown Content */}
              <div className="prose prose-sm dark:prose-invert max-w-none break-words">
                  <ReactMarkdown 
                    components={{
                        code: CodeBlock,
                        h1: ({node, ...props}) => <h1 className="text-xl font-bold border-b border-gray-700 pb-2 mb-2" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-lg font-bold text-brand mt-4 mb-2" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc ml-4 space-y-1 my-2" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal ml-4 space-y-1 my-2" {...props} />,
                        a: ({node, ...props}) => <a className="text-blue-400 hover:underline" target="_blank" {...props} />,
                        blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-brand/50 pl-4 py-1 my-2 bg-brand/5 rounded-r" {...props} />,
                        p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-4 animate-pulse">
             <div className="w-10 h-10 rounded-full bg-[#111] border border-brand/30 flex items-center justify-center shrink-0">
               <Logo className="w-6 h-6 text-brand" />
             </div>
             <div className="bg-white dark:bg-[#161b22] p-4 rounded-2xl rounded-tl-none border border-gray-200 dark:border-gray-700 flex items-center gap-2">
               <div className="w-2 h-2 bg-brand rounded-full animate-bounce"></div>
               <div className="w-2 h-2 bg-brand rounded-full animate-bounce delay-100"></div>
               <div className="w-2 h-2 bg-brand rounded-full animate-bounce delay-200"></div>
             </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border dark:border-gray-800 bg-canvas-subtle dark:bg-[#161b22]">
        <div className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="ጥያቄህን እዚህ ጻፍ..."
            className="flex-1 bg-white dark:bg-[#0d1117] border border-border dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand shadow-inner"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-brand hover:bg-brand-hover text-white p-3 rounded-xl transition-all disabled:opacity-50 disabled:scale-95 shadow-lg shadow-brand/20 active:scale-95"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
