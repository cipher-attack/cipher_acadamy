
import React, { useEffect, useRef, useState } from 'react';
import { TerminalLine } from '../types';
import { Play, RefreshCw, XCircle, Terminal as TerminalIcon, Copy, Check } from 'lucide-react';

interface TerminalProps {
  lines: TerminalLine[];
  onRun: () => void;
  onClear: () => void;
  onCommand?: (cmd: string) => Promise<void>; 
  isRunning: boolean;
}

const Terminal: React.FC<TerminalProps> = ({ lines: initialLines, onRun, onClear, onCommand, isRunning }) => {
  const [localLines, setLocalLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync props to local state
  useEffect(() => {
    setLocalLines(initialLines);
  }, [initialLines]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [localLines]);

  // Focus input on click
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleCopy = (text: string, index: number) => {
      navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
        const cmd = input.trim();
        
        // Add to history
        const newHistory = [...history, cmd];
        setHistory(newHistory);
        setHistoryIndex(newHistory.length);
        setInput('');

        // Client-side visual update immediately
        if (cmd === 'clear') {
            setLocalLines([]);
            onClear();
            return;
        }

        // Add Input Line UI immediately
        setLocalLines(prev => [...prev, { type: 'input', content: cmd }]);

        if (onCommand) {
            // Let parent handle it (which calls executeCommand)
            await onCommand(cmd);
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setInput(history[newIndex]);
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setInput(history[newIndex]);
        } else {
            setHistoryIndex(history.length);
            setInput('');
        }
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0d1117] font-mono text-sm border-t border-[#30363d]" onClick={handleContainerClick}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d] select-none shrink-0 h-10">
        <div className="flex items-center gap-3">
           <TerminalIcon size={14} className="text-gray-500" />
           <span className="text-xs text-gray-400 font-medium">root@kali:~</span>
        </div>

        <div className="flex items-center gap-3">
           {/* New Status Indicator - Always Online */}
           <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(16,185,129,0.8)] animate-pulse"></div>
              <span className="text-[10px] text-green-500 uppercase tracking-wider font-bold">
                ONLINE
              </span>
           </div>
           
           <div className="hidden sm:block h-3 w-[1px] bg-[#30363d]"></div>

           <button 
            onClick={() => { setLocalLines([]); onClear(); }}
            className="text-gray-500 hover:text-white transition-colors p-1"
            title="Clear Console"
          >
            <XCircle size={16} />
          </button>
           <button 
            onClick={onRun}
            disabled={isRunning}
            className={`flex items-center gap-2 px-3 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider transition-all border ${
              isRunning
                ? 'bg-[#21262d] border-[#30363d] text-gray-500 cursor-not-allowed' 
                : 'bg-green-600 border-green-500 hover:bg-green-500 text-white shadow-sm active:scale-95'
            }`}
          >
            {isRunning ? <RefreshCw className="animate-spin" size={10} /> : <Play size={10} fill="currentColor" />}
            {isRunning ? 'RUNNING' : 'RUN'}
          </button>
        </div>
      </div>

      {/* Terminal Output Body */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto font-mono bg-[#0d1117] text-[#c9d1d9] scrollbar-thin cursor-text pb-20"
        style={{ fontFamily: '"JetBrains Mono", monospace' }}
      >
        {localLines.length === 0 && (
          <div className="text-gray-500 text-xs leading-relaxed mb-4">
            <span className="text-green-500 font-bold">EthicalCode OS v3.5 [Hybrid]</span><br/>
            Connection established securely.<br/><br/>
            Type <span className="text-white bg-gray-800 px-1 rounded">'help'</span> for available commands.<br/>
            Click <span className="text-white bg-green-900/50 px-1 rounded border border-green-800">RUN</span> to execute Python code locally.
          </div>
        )}

        {localLines.map((line, idx) => (
          <div key={idx} className="mb-1 break-words whitespace-pre-wrap leading-tight group relative text-xs md:text-sm">
            {/* Copy Button for Output Lines */}
            {(line.type === 'output' || line.type === 'success' || line.type === 'info') && (
                <button 
                    onClick={(e) => { e.stopPropagation(); handleCopy(line.content, idx); }}
                    className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 bg-[#21262d] text-gray-400 hover:text-white p-1 rounded transition-opacity z-10"
                    title="Copy output"
                >
                    {copiedIndex === idx ? <Check size={12} className="text-green-500"/> : <Copy size={12}/>}
                </button>
            )}

            {line.type === 'input' && (
              <div className="flex gap-2 font-bold mt-3">
                <span className="text-green-500 shrink-0">root@kali:~$</span>
                <span className="text-white">{line.content}</span>
              </div>
            )}
            {line.type === 'output' && (
              <span className="text-gray-300 block ml-0 select-text selection:bg-blue-500/30">{line.content}</span>
            )}
            {line.type === 'error' && (
              <span className="text-red-400 block bg-red-900/10 p-2 rounded-sm border-l-2 border-red-500 my-1">{line.content}</span>
            )}
            {line.type === 'system' && (
              <span className="text-blue-400 italic text-[10px] opacity-80 block py-1">[{line.content}]</span>
            )}
            {line.type === 'success' && (
               <div className="my-4 p-3 border-l-4 border-green-500 bg-green-500/10 text-green-400 font-bold animate-in slide-in-from-left-2 select-text">
                   {line.content}
               </div>
            )}
            {line.type === 'info' && (
              <span className="text-yellow-400 block py-1 border-l-2 border-yellow-500 pl-2 my-1 bg-yellow-500/10 font-medium select-text">
                  {line.content}
              </span>
            )}
          </div>
        ))}
        
        {/* Active Input Line */}
        <div className="flex items-center gap-2 mt-2 text-xs md:text-sm">
            <span className="text-green-500 font-bold shrink-0">root@kali:~$</span>
            <input 
                ref={inputRef}
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-white font-mono h-6 p-0 placeholder-gray-700"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                placeholder={isRunning ? "Processing..." : ""}
            />
        </div>
        <div ref={scrollRef} className="h-4"></div>
      </div>
    </div>
  );
};

export default Terminal;
