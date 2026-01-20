import React, { useState } from 'react';
import { Key, X, Save, ExternalLink } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
  currentKey: string;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSave, currentKey }) => {
  const [key, setKey] = useState(currentKey);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#161b22] border border-border dark:border-gray-700 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="flex items-center justify-between p-4 border-b border-border dark:border-gray-700 bg-gray-50 dark:bg-[#0d1117]">
          <div className="flex items-center gap-2 text-brand">
            <Key size={20} />
            <h2 className="font-bold text-gray-900 dark:text-white">Gemini API Key</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-500 dark:text-gray-400">Enter your Google Gemini API Key</label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-white dark:bg-[#0d1117] border border-border dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-brand transition-colors font-mono text-sm shadow-inner"
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-500/20 rounded-lg p-3">
            <p className="text-xs text-blue-700 dark:text-blue-200 leading-relaxed">
              To use the AI Tutor and Code Execution features, you need a free API key from Google. The key is saved locally on your device.
            </p>
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-brand hover:underline mt-2 font-bold"
            >
              Get API Key <ExternalLink size={10} />
            </a>
          </div>

          <button
            onClick={() => onSave(key)}
            className="w-full bg-brand hover:bg-brand-hover text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Save size={18} />
            Save Key
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;