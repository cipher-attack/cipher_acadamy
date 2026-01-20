import React, { useState } from 'react';
import { Cpu, Lock, Unlock, Zap, HelpCircle } from 'lucide-react';
import { ReverseChallenge, UserProfile } from '../types';
import { REVERSE_CHALLENGES } from '../data/gameData';

interface ReverseEngineeringProps {
  user: UserProfile;
  onSolve: (challenge: ReverseChallenge) => void;
}

const ReverseEngineering: React.FC<ReverseEngineeringProps> = ({ user, onSolve }) => {
  const [activeChallenge, setActiveChallenge] = useState<ReverseChallenge | null>(null);
  const [testInput, setTestInput] = useState<string>('');
  const [logs, setLogs] = useState<{in: number, out: number}[]>([]);
  const [guess, setGuess] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSelect = (c: ReverseChallenge) => {
      setActiveChallenge(c);
      setLogs([]);
      setTestInput('');
      setGuess('');
      setError(null);
  };

  const handleTest = () => {
      if (!activeChallenge) return;
      const num = parseInt(testInput);
      if (isNaN(num)) return;

      const output = activeChallenge.hiddenLogic(num);
      setLogs(prev => [...prev, { in: num, out: output }]);
      setTestInput('');
  };

  const handleSubmit = () => {
      if (!activeChallenge) return;
      
      // Normalize guess (remove spaces)
      const normalizedGuess = guess.replace(/\s/g, '').toLowerCase();
      const normalizedTarget = activeChallenge.targetAnswer.replace(/\s/g, '').toLowerCase();

      if (normalizedGuess === normalizedTarget) {
          onSolve(activeChallenge);
          setActiveChallenge(null); // Return to menu or show success modal
      } else {
          setError("INCORRECT LOGIC DETECTED. ACCESS DENIED.");
          setTimeout(() => setError(null), 2000);
      }
  };

  return (
    <div className="flex h-full bg-black font-mono text-green-500">
        {/* Sidebar Selection */}
        <div className="w-1/3 border-r border-green-900/50 p-4 bg-black">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-green-400 tracking-widest border-b border-green-900/50 pb-2">
                <Cpu /> REVERSE_ENG_LAB
            </h2>
            
            <div className="space-y-2">
                {REVERSE_CHALLENGES.map(c => {
                    const isSolved = user.reverseSolved.includes(c.id);
                    return (
                        <button 
                            key={c.id}
                            onClick={() => handleSelect(c)}
                            className={`w-full text-left p-3 border rounded transition-all hover:bg-green-900/20 ${
                                activeChallenge?.id === c.id ? 'border-green-400 bg-green-900/30' : 'border-green-900/30 text-green-700'
                            }`}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold">{c.title}</span>
                                {isSolved ? <Unlock size={14} /> : <Lock size={14} />}
                            </div>
                            <div className="text-xs opacity-70 flex justify-between">
                                <span>{c.difficulty}</span>
                                <span>{c.rewardXP} XP</span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>

        {/* Main Lab Area */}
        <div className="flex-1 p-8 flex flex-col relative overflow-hidden">
            {/* Background Matrix Effect (Static CSS for now) */}
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(0deg,transparent_24%,rgba(0,255,0,.3)_25%,rgba(0,255,0,.3)_26%,transparent_27%,transparent_74%,rgba(0,255,0,.3)_75%,rgba(0,255,0,.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(0,255,0,.3)_25%,rgba(0,255,0,.3)_26%,transparent_27%,transparent_74%,rgba(0,255,0,.3)_75%,rgba(0,255,0,.3)_76%,transparent_77%,transparent)] bg-[length:50px_50px]"></div>

            {activeChallenge ? (
                <div className="max-w-2xl mx-auto w-full z-10">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold mb-2">{activeChallenge.title}</h1>
                        <p className="text-green-300">{activeChallenge.description}</p>
                    </div>

                    {/* The Black Box Visualization */}
                    <div className="bg-gray-900 border-2 border-green-500 rounded-lg p-6 mb-8 relative shadow-[0_0_20px_rgba(0,255,0,0.2)]">
                        <div className="absolute -top-3 left-4 bg-black px-2 text-xs font-bold">BLACK_BOX_MODULE</div>
                        
                        <div className="flex items-center justify-between gap-4">
                            {/* Input */}
                            <div className="flex-1">
                                <label className="block text-xs mb-1 opacity-70">INPUT (x)</label>
                                <input 
                                    type="number" 
                                    value={testInput}
                                    onChange={(e) => setTestInput(e.target.value)}
                                    placeholder="?"
                                    className="w-full bg-black border border-green-700 p-2 text-center text-xl focus:border-green-400 outline-none text-green-400"
                                />
                            </div>
                            
                            {/* Process Icon */}
                            <div className="flex flex-col items-center">
                                <div className="h-0.5 w-10 bg-green-500/50"></div>
                                <Cpu className="animate-pulse text-green-400 my-2" />
                                <div className="h-0.5 w-10 bg-green-500/50"></div>
                                <button 
                                    onClick={handleTest}
                                    className="mt-2 text-xs bg-green-900/50 px-2 py-1 rounded hover:bg-green-700 transition-colors"
                                >
                                    TEST
                                </button>
                            </div>

                            {/* Output */}
                            <div className="flex-1 opacity-50">
                                <label className="block text-xs mb-1 opacity-70">OUTPUT</label>
                                <div className="w-full bg-black border border-green-900 p-2 text-center text-xl text-green-800">
                                    ###
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Logs */}
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div className="bg-black border border-green-900/50 p-4 h-48 overflow-y-auto font-mono text-sm">
                            <div className="border-b border-green-900 mb-2 pb-1 text-xs opacity-70">EXECUTION LOGS</div>
                            {logs.map((l, i) => (
                                <div key={i} className="flex justify-between mb-1">
                                    <span>In: <span className="text-white">{l.in}</span></span>
                                    <span>➜</span>
                                    <span>Out: <span className="text-green-300 font-bold">{l.out}</span></span>
                                </div>
                            ))}
                            {logs.length === 0 && <span className="opacity-30 italic">No tests run yet...</span>}
                        </div>

                        {/* Solution Input */}
                        <div className="flex flex-col justify-end">
                            <label className="text-xs mb-2 flex items-center gap-1">
                                <HelpCircle size={12} /> ENTER PYTHON FORMULA
                            </label>
                            <input 
                                type="text"
                                value={guess}
                                onChange={(e) => setGuess(e.target.value)}
                                placeholder="e.g. x * 2 + 5"
                                className={`bg-black border p-3 outline-none mb-4 ${error ? 'border-red-500 text-red-500 animate-shake' : 'border-green-500 text-white'}`}
                            />
                            {error && <div className="text-red-500 text-xs mb-2 font-bold">{error}</div>}
                            <button 
                                onClick={handleSubmit}
                                className="bg-green-600 text-black font-bold py-3 hover:bg-green-500 transition-colors shadow-[0_0_15px_rgba(0,255,0,0.4)]"
                            >
                                CRACK SYSTEM
                            </button>
                        </div>
                    </div>

                </div>
            ) : (
                <div className="flex items-center justify-center h-full text-green-900 text-6xl font-black tracking-tighter opacity-20 rotate-[-5deg]">
                    SELECT_TARGET
                </div>
            )}
        </div>
    </div>
  );
};

export default ReverseEngineering;