
import React, { useRef } from 'react';
import { Lightbulb, ShieldAlert, FileCode, Play, Terminal, Braces, Hash } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (val: string) => void;
  onExplain?: () => void;
  onAudit?: () => void;
  isExplaining?: boolean;
  isAuditing?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, onExplain, onAudit, isExplaining, isAuditing }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Helper to insert text at cursor position
  const insertText = (text: string) => {
    if (!textareaRef.current) return;
    
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    
    const newCode = code.substring(0, start) + text + code.substring(end);
    onChange(newCode);
    
    // Restore focus and move cursor
    setTimeout(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + text.length;
        }
    }, 0);
  };

  const QUICK_KEYS = ['tab', 'print', '(', ')', ':', '=', '"', "'", '[', ']', '{', '}', '#', 'if', 'def'];

  return (
    <div className="flex flex-col h-full w-full bg-[#050505] relative">
        {/* Header */}
        <div className="h-10 bg-[#0a0a0a] flex items-center justify-between pr-3 select-none border-b border-gray-800 shrink-0">
            <div className="flex h-full">
                <div className="h-full px-4 bg-[#050505] flex items-center gap-2 border-t-2 border-brand text-xs text-brand font-bold min-w-[120px] border-r border-gray-800">
                    <FileCode size={14} />
                    main.py
                </div>
            </div>
            
            <div className="flex gap-2">
                {onExplain && (
                    <button 
                        onClick={onExplain}
                        disabled={isExplaining || isAuditing}
                        className="flex items-center gap-1.5 text-[10px] font-medium text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/5 border border-transparent hover:border-gray-700"
                    >
                        <Lightbulb size={12} className="text-yellow-500" />
                        <span className="hidden sm:inline">Explain</span>
                    </button>
                )}
                {onAudit && (
                    <button 
                        onClick={onAudit}
                        disabled={isExplaining || isAuditing}
                        className="flex items-center gap-1.5 text-[10px] font-medium text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/5 border border-transparent hover:border-gray-700"
                    >
                        <ShieldAlert size={12} className="text-red-500" />
                        <span className="hidden sm:inline">Scan</span>
                    </button>
                )}
            </div>
        </div>

        <div className="relative flex-1 min-h-0 flex flex-col">
            {/* Editor Area */}
            <div className="relative flex-1 flex">
                 {/* Line Numbers */}
                <div className="w-10 bg-[#0a0a0a] text-gray-600 text-[10px] font-mono text-right pr-2 pt-4 select-none border-r border-gray-800 hidden xs:block">
                    {code.split('\n').map((_, i) => (
                        <div key={i} className="leading-6">{i + 1}</div>
                    ))}
                </div>

                <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 bg-[#050505] text-gray-300 font-mono text-sm p-4 leading-6 resize-none focus:outline-none border-none selection:bg-brand/20 placeholder-gray-800"
                    spellCheck={false}
                    style={{ fontFamily: '"JetBrains Mono", monospace' }}
                    placeholder="# Write your exploit here..."
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                />
            </div>

            {/* Mobile Quick-Key Toolbar (The Game Changer for UX) */}
            <div className="h-12 bg-[#111] border-t border-gray-800 flex items-center gap-2 px-2 overflow-x-auto no-scrollbar shadow-lg z-20">
                <div className="flex items-center gap-2 pr-4">
                    {QUICK_KEYS.map((key) => (
                        <button
                            key={key}
                            onClick={() => insertText(key === 'tab' ? '    ' : key)}
                            className="h-8 px-3 min-w-[36px] bg-[#222] text-brand font-mono text-sm font-bold rounded border border-gray-700 hover:bg-brand hover:text-black active:scale-95 transition-all flex items-center justify-center shrink-0 shadow-sm"
                        >
                            {key === 'tab' ? 'TAB' : key}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default CodeEditor;
