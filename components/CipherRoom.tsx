
import React, { useState, useEffect } from 'react';
import { Cpu, Unlock, Zap, Activity, Eye, Mail, Binary, ShieldAlert, User, Radio, ArrowRight } from 'lucide-react';
import { ReverseChallenge, CryptoChallenge, VulnChallenge, SocialChallenge, SignalChallenge, UserProfile } from '../types';
import { REVERSE_CHALLENGES, CRYPTO_CHALLENGES, VULN_CHALLENGES, SOCIAL_CHALLENGES, SIGNAL_CHALLENGES } from '../data/gameData';
import Logo from './Logo';

interface CipherRoomProps {
  user: UserProfile;
  onSolveReverse: (challenge: ReverseChallenge) => void;
  onSolveCrypto: (challenge: CryptoChallenge) => void;
  onSolveVuln: (challenge: VulnChallenge) => void;
  onSolveSocial: (challenge: SocialChallenge) => void;
  onSolveSignal: (challenge: SignalChallenge) => void;
}

type GameMode = 'REVERSE' | 'CRYPTO' | 'VULN' | 'SOCIAL' | 'SIGNAL';

const CipherRoom: React.FC<CipherRoomProps> = ({ user, onSolveReverse, onSolveCrypto, onSolveVuln, onSolveSocial, onSolveSignal }) => {
  const [mode, setMode] = useState<GameMode>('REVERSE');
  
  // Logic State (Reverse)
  const [activeRev, setActiveRev] = useState<ReverseChallenge | null>(null);
  const [testInput, setTestInput] = useState<string>('');
  const [logs, setLogs] = useState<{in: number, out: number}[]>([]);
  const [revGuess, setRevGuess] = useState('');
  
  // Crypto State
  const [activeCry, setActiveCry] = useState<CryptoChallenge | null>(null);
  const [cryGuess, setCryGuess] = useState('');

  // Vuln State
  const [activeVuln, setActiveVuln] = useState<VulnChallenge | null>(null);
  const [vulnSelection, setVulnSelection] = useState<string | null>(null);

  // Social State
  const [activeSocial, setActiveSocial] = useState<SocialChallenge | null>(null);
  const [socialSelection, setSocialSelection] = useState<string | null>(null);

  // Signal State
  const [activeSignal, setActiveSignal] = useState<SignalChallenge | null>(null);
  const [signalSelection, setSignalSelection] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [successXP, setSuccessXP] = useState<number>(0);
  const [showHint, setShowHint] = useState(false);

  const resetSelection = () => {
      setActiveRev(null);
      setActiveCry(null);
      setActiveVuln(null);
      setActiveSocial(null);
      setActiveSignal(null);
      setLogs([]);
      setTestInput('');
      setRevGuess('');
      setCryGuess('');
      setVulnSelection(null);
      setSocialSelection(null);
      setSignalSelection(null);
      setError(null);
      setSuccessMsg(null);
      setShowHint(false);
  };

  // --- HANDLERS ---
  const handleSelectRev = (c: ReverseChallenge) => { resetSelection(); setActiveRev(c); };
  const handleSelectCry = (c: CryptoChallenge) => { resetSelection(); setActiveCry(c); };
  const handleSelectVuln = (c: VulnChallenge) => { resetSelection(); setActiveVuln(c); };
  const handleSelectSocial = (c: SocialChallenge) => { resetSelection(); setActiveSocial(c); };
  const handleSelectSignal = (c: SignalChallenge) => { resetSelection(); setActiveSignal(c); };

  const handleTestRev = () => {
      if (!activeRev) return;
      const num = parseInt(testInput);
      if (isNaN(num)) return;
      const output = activeRev.hiddenLogic(num);
      setLogs(prev => [...prev, { in: num, out: output }]);
      setTestInput('');
  };

  const triggerSuccess = (msg: string, xp: number, callback: () => void) => {
      setSuccessMsg(msg);
      setSuccessXP(xp);
      setTimeout(() => {
          callback();
      }, 1500); 
      setTimeout(() => {
          setSuccessMsg(null);
          resetSelection();
      }, 3000);
  };

  const handleSubmitRev = () => {
      if (!activeRev) return;
      const normalizedGuess = revGuess.replace(/\s/g, '').toLowerCase();
      const normalizedTarget = activeRev.targetAnswer.replace(/\s/g, '').toLowerCase();
      if (normalizedGuess === normalizedTarget) {
          triggerSuccess("SYSTEM BYPASSED", activeRev.rewardXP, () => onSolveReverse(activeRev));
      } else { setError("ACCESS DENIED"); setTimeout(() => setError(null), 2000); }
  };

  const handleSubmitCry = () => {
      if (!activeCry) return;
      if (cryGuess.trim() === activeCry.solution) {
          triggerSuccess("DECRYPTED", activeCry.rewardXP, () => onSolveCrypto(activeCry));
      } else { setError("INVALID KEY"); setTimeout(() => setError(null), 2000); }
  };

  const handleSubmitVuln = () => {
      if (!activeVuln || !vulnSelection) return;
      if (vulnSelection === activeVuln.vulnerability) {
          triggerSuccess("PATCHED", activeVuln.rewardXP, () => onSolveVuln(activeVuln));
      } else { setError("INCORRECT ANALYSIS"); setTimeout(() => setError(null), 2000); }
  };

  const handleSubmitSocial = () => {
      if (!activeSocial || !socialSelection) return;
      if (socialSelection === activeSocial.attackType) {
          triggerSuccess("THREAT NEUTRALIZED", activeSocial.rewardXP, () => onSolveSocial(activeSocial));
      } else { setError("COMPROMISED"); setTimeout(() => setError(null), 2000); }
  };

  const handleSubmitSignal = () => {
      if (!activeSignal || !signalSelection) return;
      if (signalSelection === activeSignal.correctAnswer) {
          triggerSuccess("SIGNAL ISOLATED", activeSignal.rewardXP, () => onSolveSignal(activeSignal));
      } else { setError("SIGNAL LOST"); setTimeout(() => setError(null), 2000); }
  };

  // --- SUB COMPONENTS (Local) ---
  const ModeButton = ({ id, icon: Icon, label }: { id: GameMode; icon: any; label: string }) => (
      <button 
        onClick={() => setMode(id)} 
        className={`flex-shrink-0 flex items-center justify-center gap-2 py-2 px-3 text-[10px] uppercase font-bold tracking-widest transition-all rounded-md ${
            mode === id 
            ? 'bg-brand text-black shadow-lg shadow-brand/20' 
            : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
        }`}
      >
          <Icon size={14} />
          {label}
      </button>
  );

  return (
    <div className="flex flex-col md:flex-row h-full bg-[#030303] font-sans text-gray-200 overflow-hidden relative">
        {/* SUCCESS OVERLAY - Professional */}
        {successMsg && (
            <div className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-8 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(197,160,89,0.3)] mb-6 animate-bounce">
                        <Zap size={32} className="text-black" fill="currentColor" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">{successMsg}</h2>
                    <p className="text-brand font-mono text-sm tracking-widest">XP ACQUIRED: +{successXP}</p>
                </div>
            </div>
        )}

        {/* SIDEBAR - Selection */}
        <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-[#27272a] flex flex-col bg-[#050505] flex-shrink-0 max-h-[40%] md:max-h-full overflow-hidden">
            <div className="p-4 border-b border-[#27272a] bg-[#080808]">
                <div className="flex items-center gap-2 mb-4 text-brand">
                    <Logo className="w-5 h-5" />
                    <span className="font-bold text-sm tracking-widest uppercase font-mono">Operations</span>
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    <ModeButton id="REVERSE" icon={Cpu} label="Logic" />
                    <ModeButton id="CRYPTO" icon={Binary} label="Crypto" />
                    <ModeButton id="VULN" icon={ShieldAlert} label="Vuln" />
                    <ModeButton id="SOCIAL" icon={User} label="Social" />
                    <ModeButton id="SIGNAL" icon={Radio} label="Signal" />
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar bg-[#050505]">
                {mode === 'REVERSE' && REVERSE_CHALLENGES.map(c => <ChallengeBtn key={c.id} data={c} solved={user.reverseSolved.includes(c.id)} active={activeRev?.id === c.id} onClick={() => handleSelectRev(c)} />)}
                {mode === 'CRYPTO' && CRYPTO_CHALLENGES.map(c => <ChallengeBtn key={c.id} data={c} solved={user.cryptoSolved?.includes(c.id)} active={activeCry?.id === c.id} onClick={() => handleSelectCry(c)} />)}
                {mode === 'VULN' && VULN_CHALLENGES.map(c => <ChallengeBtn key={c.id} data={c} solved={user.vulnSolved?.includes(c.id)} active={activeVuln?.id === c.id} onClick={() => handleSelectVuln(c)} />)}
                {mode === 'SOCIAL' && SOCIAL_CHALLENGES.map(c => <ChallengeBtn key={c.id} data={c} solved={user.socialSolved?.includes(c.id)} active={activeSocial?.id === c.id} onClick={() => handleSelectSocial(c)} />)}
                {mode === 'SIGNAL' && SIGNAL_CHALLENGES.map(c => <ChallengeBtn key={c.id} data={c} solved={user.signalSolved?.includes(c.id)} active={activeSignal?.id === c.id} onClick={() => handleSelectSignal(c)} />)}
            </div>
        </div>

        {/* WORKSPACE - Content */}
        <div className="flex-1 p-6 md:p-10 flex flex-col relative overflow-hidden bg-[#030303] overflow-y-auto">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            {/* REVERSE GAME */}
            {mode === 'REVERSE' && activeRev && (
                <div className="max-w-2xl mx-auto w-full z-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Header title={activeRev.title} desc={activeRev.description} />
                    <HintBox hint={activeRev.hint} isShown={showHint} onShow={() => setShowHint(true)} />
                    
                    <div className="bg-[#0a0a0a] border border-[#27272a] rounded-xl p-6 mb-8 relative">
                        <div className="absolute -top-3 left-4 bg-[#0a0a0a] px-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-[#27272a] rounded-full">Black Box</div>
                        <div className="flex items-center gap-4 mt-2">
                            <div className="flex-1">
                                <input type="number" value={testInput} onChange={(e) => setTestInput(e.target.value)} placeholder="INPUT" className="w-full bg-[#050505] border border-[#27272a] p-4 text-center text-xl focus:border-brand outline-none text-white rounded-lg font-mono placeholder:text-gray-800 transition-colors" />
                            </div>
                            <button onClick={handleTestRev} className="bg-white/5 hover:bg-white/10 border border-[#27272a] text-gray-300 p-4 rounded-lg transition-colors"><ArrowRight size={20}/></button>
                            <div className="flex-1">
                                <div className="w-full bg-[#050505] border border-[#27272a] p-4 text-center text-xl text-brand font-mono rounded-lg opacity-50">OUTPUT</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#0a0a0a] border border-[#27272a] rounded-xl p-4 h-48 overflow-y-auto font-mono text-sm custom-scrollbar">
                            <div className="text-[10px] text-gray-600 mb-2 uppercase tracking-wider font-bold">Execution Log</div>
                            {logs.map((l, i) => (<div key={i} className="flex justify-between py-1 border-b border-[#27272a] last:border-0 text-gray-400"><span>In: {l.in}</span><span className="text-brand">Out: {l.out}</span></div>))}
                            {logs.length === 0 && <span className="text-gray-800 italic">No data...</span>}
                        </div>
                        <div className="flex flex-col justify-end space-y-4">
                            <div>
                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2 block">Python Formula</label>
                                <input type="text" value={revGuess} onChange={(e) => setRevGuess(e.target.value)} placeholder="e.g. x * 2 + 5" className={`w-full bg-[#0a0a0a] border p-4 rounded-lg outline-none font-mono text-sm transition-all ${error ? 'border-red-900 text-red-500' : 'border-[#27272a] text-white focus:border-brand'}`} />
                            </div>
                            <button onClick={handleSubmitRev} className="bg-brand text-black font-bold py-3 rounded-lg hover:bg-[#b08d4a] transition-all shadow-lg shadow-brand/10">EXECUTE</button>
                        </div>
                    </div>
                </div>
            )}

            {/* CRYPTO GAME */}
            {mode === 'CRYPTO' && activeCry && (
                <div className="max-w-2xl mx-auto w-full z-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Header title={activeCry.title} desc={activeCry.description} />
                    <HintBox hint={activeCry.hint} isShown={showHint} onShow={() => setShowHint(true)} />
                    <div className="bg-[#0a0a0a] border border-[#27272a] p-8 rounded-xl mb-8 text-center shadow-inner">
                        <span className="text-xs text-gray-600 uppercase tracking-widest mb-4 block">Encrypted Payload</span>
                        <div className="text-2xl md:text-3xl font-mono text-white tracking-widest break-all select-all">{activeCry.ciphertext}</div>
                    </div>
                    <div className="space-y-4">
                        <input type="text" value={cryGuess} onChange={(e) => setCryGuess(e.target.value)} placeholder="Enter decrypted text..." className={`w-full bg-[#0a0a0a] border p-4 rounded-lg outline-none font-mono text-sm text-center ${error ? 'border-red-900 text-red-500' : 'border-[#27272a] text-white focus:border-brand'}`} />
                        <button onClick={handleSubmitCry} className="w-full bg-brand text-black font-bold py-3 rounded-lg hover:bg-[#b08d4a] transition-all">VERIFY KEY</button>
                    </div>
                </div>
            )}

            {/* VULN GAME */}
            {mode === 'VULN' && activeVuln && (
                <div className="max-w-3xl mx-auto w-full z-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Header title={activeVuln.title} desc={activeVuln.description} />
                    <HintBox hint={activeVuln.hint} isShown={showHint} onShow={() => setShowHint(true)} />
                    <div className="bg-[#0a0a0a] border border-[#27272a] rounded-xl overflow-hidden mb-8">
                        <div className="bg-[#111] px-4 py-2 border-b border-[#27272a] flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                        </div>
                        <div className="p-6 overflow-x-auto custom-scrollbar">
                            <pre className="text-sm font-mono text-gray-300 leading-relaxed bg-transparent border-0">{activeVuln.codeSnippet}</pre>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                        {activeVuln.options.map((opt, idx) => (
                            <button key={idx} onClick={() => setVulnSelection(opt)} className={`p-4 border rounded-lg text-left text-sm transition-all ${vulnSelection === opt ? 'bg-white/10 border-white text-white' : 'bg-[#0a0a0a] border-[#27272a] text-gray-400 hover:bg-[#111] hover:border-gray-700'}`}>{opt}</button>
                        ))}
                    </div>
                    <button onClick={handleSubmitVuln} disabled={!vulnSelection} className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-all">CONFIRM VULNERABILITY</button>
                </div>
            )}

            {/* SOCIAL GAME */}
            {mode === 'SOCIAL' && activeSocial && (
                <div className="max-w-2xl mx-auto w-full z-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Header title={activeSocial.title} desc={activeSocial.description} />
                    <div className="bg-white rounded-xl overflow-hidden mb-8 text-gray-900 shadow-2xl">
                        <div className="bg-gray-100 p-4 border-b border-gray-200 flex justify-between items-center">
                            <div className="flex items-center gap-2"><Mail size={16} className="text-gray-500"/> <span className="font-bold text-sm">Inbox</span></div>
                            <span className="text-xs text-gray-400">Just now</span>
                        </div>
                        <div className="p-6">
                            <div className="mb-2 text-sm"><span className="text-gray-500">From:</span> <span className="font-bold bg-yellow-100 px-1">{activeSocial.scenario.from}</span></div>
                            <div className="mb-6 text-sm"><span className="text-gray-500">Subject:</span> <span className="font-bold">{activeSocial.scenario.subject}</span></div>
                            <div className="text-sm leading-relaxed font-serif">{activeSocial.scenario.body}</div>
                        </div>
                    </div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Identify Attack Vector</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                        {activeSocial.options.map((opt, idx) => (
                            <button key={idx} onClick={() => setSocialSelection(opt)} className={`p-4 border rounded-lg text-left text-sm transition-all ${socialSelection === opt ? 'bg-white/10 border-white text-white' : 'bg-[#0a0a0a] border-[#27272a] text-gray-400 hover:bg-[#111] hover:border-gray-700'}`}>{opt}</button>
                        ))}
                    </div>
                    <button onClick={handleSubmitSocial} disabled={!socialSelection} className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-all">ANALYZE</button>
                </div>
            )}

            {/* SIGNAL GAME */}
            {mode === 'SIGNAL' && activeSignal && (
                <div className="max-w-3xl mx-auto w-full z-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Header title={activeSignal.title} desc={activeSignal.description} />
                    <div className="bg-[#0a0a0a] border border-[#27272a] rounded-xl mb-8 overflow-hidden">
                        <div className="bg-[#111] px-4 py-2 border-b border-[#27272a] text-[10px] font-mono text-gray-500 flex justify-between">
                            <span>NETWORK_LOGS</span>
                            <span>STATUS: CAPTURED</span>
                        </div>
                        <div className="p-6 font-mono text-xs text-gray-400 whitespace-pre-wrap">{activeSignal.logData}</div>
                    </div>
                    <h3 className="text-xs font-bold text-brand uppercase tracking-widest mb-3">{activeSignal.question}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                        {activeSignal.options.map((opt, idx) => (
                            <button key={idx} onClick={() => setSignalSelection(opt)} className={`p-4 border rounded-lg text-left text-sm transition-all ${signalSelection === opt ? 'bg-brand/20 border-brand text-brand' : 'bg-[#0a0a0a] border-[#27272a] text-gray-400 hover:bg-[#111] hover:border-gray-700'}`}>{opt}</button>
                        ))}
                    </div>
                    <button onClick={handleSubmitSignal} disabled={!signalSelection} className="w-full bg-brand text-black font-bold py-3 rounded-lg hover:bg-[#b08d4a] disabled:opacity-50 transition-all">IDENTIFY ANOMALY</button>
                </div>
            )}

            {/* EMPTY STATE */}
            {!activeRev && !activeCry && !activeVuln && !activeSocial && !activeSignal && (
                <div className="flex flex-col items-center justify-center h-full opacity-20 select-none">
                    <Logo className="w-32 h-32 mb-6 text-gray-500" />
                    <div className="text-2xl font-bold tracking-widest text-gray-500">AWAITING INPUT</div>
                </div>
            )}
        </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const Header = ({title, desc}: {title: string, desc: string}) => (
    <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white font-serif">{title}</h1>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
);

const HintBox = ({hint, isShown, onShow}: {hint: string, isShown: boolean, onShow: () => void}) => {
    if (!hint) return null;
    return (
        <div className="mb-6">
            {!isShown ? (
                <button onClick={onShow} className="text-xs font-bold text-brand hover:text-white transition-colors flex items-center gap-2">
                    <Eye size={12} /> View Hint
                </button>
            ) : (
                <div className="bg-[#0a0a0a] border border-[#27272a] p-3 rounded-lg text-xs text-gray-400">
                    <span className="text-brand font-bold mr-2">INTEL:</span> {hint}
                </div>
            )}
        </div>
    );
};

interface ChallengeBtnProps {
    data: any;
    solved: boolean;
    active: boolean;
    onClick: () => void;
}

// The Challenge Button - Updated to use Logo instead of Lock
const ChallengeBtn: React.FC<ChallengeBtnProps> = ({ data, solved, active, onClick }) => {
    return (
        <button 
            onClick={onClick} 
            className={`w-full text-left p-3 rounded-lg transition-all mb-1 flex items-center justify-between group ${
                active 
                ? 'bg-[#111] border border-brand/50 shadow-sm' 
                : 'border border-transparent hover:bg-[#0a0a0a] hover:border-[#27272a]'
            }`}
        >
            <div>
                <div className={`text-sm font-bold mb-0.5 ${active ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>{data.title}</div>
                <div className="text-[10px] text-gray-600 flex gap-3">
                    <span className={data.difficulty === 'Insane' ? 'text-red-900' : ''}>{data.difficulty}</span>
                    <span>{data.rewardXP} XP</span>
                </div>
            </div>
            {solved ? (
                <Unlock size={14} className="text-brand" />
            ) : (
                // Replaced Lock with Logo
                <Logo className={`w-4 h-4 opacity-30 ${active ? 'text-brand opacity-100' : 'group-hover:opacity-50'}`} />
            )}
        </button>
    );
};

export default CipherRoom;
