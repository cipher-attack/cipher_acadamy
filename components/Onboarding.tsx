
import React from 'react';
import { Code, Terminal, CheckCircle } from 'lucide-react';
import Logo from './Logo';

interface OnboardingProps {
  onComplete: (username: string, experience: 'none' | 'some') => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = React.useState(1);
  const [username, setUsername] = React.useState('');
  const [exp, setExp] = React.useState<'none' | 'some'>('none');

  const handleNext = () => {
    if (step === 1 && username.trim()) setStep(2);
    else if (step === 2) {
        onComplete(username, exp);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 dark:bg-[#0d1117] flex flex-col items-center justify-center p-6 animate-in fade-in duration-500 transition-colors">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-5 dark:opacity-20">
          <Logo variant="watermark" className="w-[600px] h-[600px] text-brand dark:text-brand animate-pulse" />
      </div>

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        
        {/* Logo Animation */}
        <div className="flex justify-center mb-8">
            <div className="w-32 h-32 rounded-full bg-white dark:bg-[#161b22] border-4 border-gray-100 dark:border-brand/30 flex items-center justify-center relative shadow-xl dark:shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                <Logo className="w-20 h-20 text-brand dark:text-brand" />
            </div>
        </div>

        {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight font-sans">
                    Cipher Academy
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    Enter the simulation. Master the art of Python & Cyber Security.
                    <br/> <span className="text-gray-500 dark:text-gray-500 font-mono text-xs uppercase tracking-widest mt-2 block">Identify yourself to begin</span>
                </p>
                
                <div className="relative group">
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="CODENAME / ALIAS"
                        className="w-full bg-white dark:bg-[#161b22] border-2 border-gray-200 dark:border-gray-700 rounded-xl px-4 py-4 text-center text-xl text-gray-900 dark:text-white font-mono placeholder:text-gray-400 focus:border-brand focus:bg-white dark:focus:bg-[#0d1117] focus:outline-none transition-all shadow-inner"
                    />
                </div>
                
                <button 
                    onClick={handleNext}
                    disabled={!username.trim()}
                    className="w-full bg-brand hover:bg-brand-hover text-white font-black tracking-widest py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand/20 hover:shadow-brand/40 transform hover:-translate-y-1"
                >
                    ESTABLISH CONNECTION
                </button>
            </div>
        )}

        {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Select Protocol <br/><span className="text-gray-500 text-sm font-mono font-normal">CHOOSE DIFFICULTY</span></h1>
                
                <div className="grid grid-cols-1 gap-4">
                    <button 
                        onClick={() => setExp('none')}
                        className={`p-5 rounded-xl border-2 flex items-center gap-4 transition-all text-left relative overflow-hidden group ${exp === 'none' ? 'bg-brand/5 border-brand text-gray-900 dark:text-white shadow-md' : 'bg-white dark:bg-[#161b22] border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-400'}`}
                    >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${exp === 'none' ? 'bg-brand text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                            <Code size={24} />
                        </div>
                        <div>
                            <div className="font-bold text-lg text-gray-900 dark:text-white">Initiate (Beginner)</div>
                            <div className="text-xs opacity-70 font-mono text-gray-600 dark:text-gray-400">Start from variables & loops.</div>
                        </div>
                        {exp === 'none' && <CheckCircle className="ml-auto text-brand animate-bounce" />}
                    </button>

                    <button 
                        onClick={() => setExp('some')}
                        className={`p-5 rounded-xl border-2 flex items-center gap-4 transition-all text-left relative overflow-hidden group ${exp === 'some' ? 'bg-purple-500/5 border-purple-500 text-gray-900 dark:text-white shadow-md' : 'bg-white dark:bg-[#161b22] border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-400'}`}
                    >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${exp === 'some' ? 'bg-purple-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                            <Terminal size={24} />
                        </div>
                        <div>
                            <div className="font-bold text-lg text-gray-900 dark:text-white">Operator (Experienced)</div>
                            <div className="text-xs opacity-70 font-mono text-gray-600 dark:text-gray-400">Skip to advanced hacking.</div>
                        </div>
                        {exp === 'some' && <CheckCircle className="ml-auto text-purple-500 animate-bounce" />}
                    </button>
                </div>

                <button 
                    onClick={handleNext}
                    className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black tracking-widest py-4 rounded-xl hover:opacity-90 transition-all mt-4 shadow-xl"
                >
                    INITIALIZE ENVIRONMENT
                </button>
            </div>
        )}

      </div>
    </div>
  );
};

export default Onboarding;
