
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Menu, ChevronLeft, BookOpen, MessageSquare, Settings, Activity, Zap, ChevronDown, ChevronRight, Flag, Award, Terminal as TerminalIcon, Layers, Lock, Sun, Moon, CheckCircle, Code, ArrowLeft, Send, Clipboard, X, HelpCircle, Book, Flame, MapPin, ToggleRight, ToggleLeft, FastForward, Key, AlertTriangle, Check
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Terminal from './components/Terminal';
import CodeEditor from './components/CodeEditor';
import AITutor from './components/AITutor';
import Quiz from './components/Quiz';
import Onboarding from './components/Onboarding';
import Certificate from './components/Certificate';
import CipherRoom from './components/CipherRoom';
import ProfileSettings from './components/ProfileSettings';
import FinalExam from './components/FinalExam'; 
import ApiKeyModal from './components/ApiKeyModal';
import Logo from './components/Logo';
import { explainCodeLogic, auditCodeSecurity } from './services/geminiService';
import { executeCommand, initPythonEngine } from './services/executionService'; 
import { getCourseData, getLessonById } from './data/courseData';
import { CTF_CHALLENGES } from './data/ctfData'; 
import { getUserProfile, getCompletedLessons, markLessonComplete, initDB, addXP, updateUserProfile } from './services/dbService';
import { SyllabusItem, TerminalLine, AppState, Language, QuizQuestion, UserProfile, CTFChallenge } from './types';

// --- ROADMAP COMPONENT ---
const LearningRoadmap = ({ syllabus, completedIds, onSelect, activeId }: { syllabus: SyllabusItem[]; completedIds: string[]; onSelect: (i: SyllabusItem) => void; activeId: string | null; }) => {
    return (
        <div className="relative py-8 px-4 max-w-md mx-auto pb-32">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-800"></div>
            {syllabus.map((item, index) => {
                const isCompleted = completedIds.includes(item.id);
                const isLocked = index > 0 && !completedIds.includes(syllabus[index - 1].id) && !isCompleted;
                const isActive = activeId === item.id;
                
                return (
                    <div key={item.id} className="relative mb-8 pl-16 group">
                        <button 
                            onClick={() => !isLocked && onSelect(item)}
                            className={`absolute left-4 -translate-x-1/2 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all z-10 shadow-sm ${
                                isCompleted 
                                    ? 'bg-brand border-brand text-black scale-100' 
                                    : isActive
                                        ? 'bg-black border-brand text-brand ring-4 ring-brand/10'
                                        : isLocked 
                                            ? 'bg-gray-100 dark:bg-[#111] border-gray-300 dark:border-gray-800 text-gray-400' 
                                            : 'bg-white dark:bg-[#111] border-gray-400 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:border-brand'
                            }`}
                        >
                            {isCompleted ? <CheckCircle size={16} /> : isLocked ? <Lock size={14} /> : <Code size={16} />}
                        </button>
                        <div 
                             onClick={() => !isLocked && onSelect(item)}
                             className={`p-4 rounded-lg border transition-all cursor-pointer ${
                                 isActive 
                                    ? 'bg-brand/5 border-brand/50' 
                                    : isLocked 
                                        ? 'bg-transparent border-gray-200 dark:border-gray-800 opacity-50' 
                                        : 'bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600'
                             }`}
                        >
                            <h3 className={`font-bold text-sm ${isActive ? 'text-brand' : isLocked ? 'text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                                {item.title}
                            </h3>
                            <p className="text-[10px] text-gray-500 mt-1 truncate font-mono">{item.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// Defined outside to prevent syntax errors or re-creation issues
const MarkdownComponents = {
  code: ({ node, className, children, ...rest }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    const isInline = !match;
    return isInline ? (
        <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-red-600 dark:text-brand break-words whitespace-normal border border-gray-200 dark:border-gray-700" {...rest}>
            {children}
        </code>
    ) : (
        <div className="relative my-4 rounded-lg overflow-hidden bg-gray-50 dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700 shadow-sm max-w-full">
            <div className="flex justify-between items-center px-3 py-1.5 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700">
                <span className="text-[10px] uppercase text-gray-500 font-mono font-bold tracking-wider">{match ? match[1] : 'text'}</span>
            </div>
            <div className="overflow-x-auto p-4 custom-scrollbar">
                <code className={className + " block whitespace-pre text-gray-800 dark:text-gray-300 font-mono text-sm leading-relaxed"} {...rest}>
                    {children}
                </code>
            </div>
        </div>
    );
  },
  // ELITE STYLING: No Emojis, Pure CSS Decoration
  h1: ({node, ...props}: any) => <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-8 font-serif border-b border-gray-200 dark:border-gray-700 pb-3" {...props} />,
  h2: ({node, ...props}: any) => <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 mt-8 font-serif flex items-center gap-2 before:content-[''] before:w-1 before:h-6 before:bg-brand before:mr-2 before:rounded-full" {...props} />,
  h3: ({node, ...props}: any) => (
    <div className="flex items-center gap-2 mt-6 mb-3">
        <div className="w-1.5 h-1.5 rounded-full bg-brand"></div>
        <h3 className="text-sm font-bold text-gray-800 dark:text-brand uppercase tracking-widest font-mono" {...props} />
    </div>
  ),
  p: ({node, ...props}: any) => <p className="text-gray-700 dark:text-gray-300 leading-7 mb-4 text-sm md:text-base" {...props} />,
  strong: ({node, ...props}: any) => <strong className="text-gray-900 dark:text-white font-bold" {...props} />,
  ul: ({node, ...props}: any) => <ul className="list-disc ml-5 mb-4 space-y-2 text-gray-700 dark:text-gray-300 marker:text-gray-400 dark:marker:text-gray-600" {...props} />,
  ol: ({node, ...props}: any) => <ol className="list-decimal ml-5 mb-4 space-y-2 text-gray-700 dark:text-gray-300 marker:font-bold marker:text-gray-500" {...props} />,
  li: ({node, ...props}: any) => <li className="pl-1" {...props} />,
  blockquote: ({node, ...props}: any) => <blockquote className="border-l-4 border-brand bg-gray-50 dark:bg-brand/5 pl-4 py-3 italic text-gray-600 dark:text-gray-400 my-6 rounded-r-lg" {...props} />,
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.ONBOARDING);
  const [syllabus, setSyllabus] = useState<SyllabusItem[]>([]);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [activeCTF, setActiveCTF] = useState<CTFChallenge | null>(null);
  const [language, setLanguage] = useState<Language>('python');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [solvedCTFs, setSolvedCTFs] = useState<string[]>([]);
  const [lessonTitle, setLessonTitle] = useState<string>("");
  const [lessonMarkdown, setLessonMarkdown] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [lessonQuiz, setLessonQuiz] = useState<QuizQuestion[] | undefined>(undefined);
  const [isProjectMode, setIsProjectMode] = useState(false);
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [auditResult, setAuditResult] = useState<string | null>(null);
  const [flagInput, setFlagInput] = useState("");
  const [flagStatus, setFlagStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 
  const [activeMobileTab, setActiveMobileTab] = useState<'learn' | 'hack' | 'ai'>('learn');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  useEffect(() => {
    initPythonEngine();
    const handleResize = () => {
        if (window.innerWidth < 768) setSidebarOpen(false); else setSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); 
    const loadUserData = async () => {
        try {
            await initDB();
            const profile = await getUserProfile();
            if (profile.username === 'Hacker_Initiate') setAppState(AppState.ONBOARDING);
            else setAppState(AppState.DASHBOARD);
            const completed = await getCompletedLessons();
            setUserProfile(profile);
            setCompletedLessons(completed);
            setSolvedCTFs((profile as any).ctfSolved || []);
            setSyllabus(getCourseData(language, profile.isBeginner !== false));
        } catch (e) { console.error("DB Init Failed", e); }
    };
    loadUserData();
    return () => window.removeEventListener('resize', handleResize);
  }, [language]);

  const handleOnboardingComplete = async (username: string, exp: 'none' | 'some') => {
      const profile = await getUserProfile();
      profile.username = username;
      profile.isBeginner = exp === 'none';
      await updateUserProfile(profile);
      setUserProfile({...profile}); 
      setSyllabus(getCourseData(language, profile.isBeginner));
      setAppState(AppState.DASHBOARD);
  };

  const handleSwitchTrack = async () => {
      if (!userProfile) return;
      const newStatus = !userProfile.isBeginner;
      const updated = await updateUserProfile({ isBeginner: newStatus });
      setUserProfile(updated);
      setSyllabus(getCourseData(language, newStatus));
      setAppState(AppState.DASHBOARD);
      setMobileMenuOpen(false);
  };

  const handleSelectLesson = (item: SyllabusItem) => {
    setActiveLessonId(item.id);
    setActiveCTF(null);
    setAppState(AppState.LESSON_VIEW);
    const content = getLessonById(item.id);
    setLessonTitle(item.title);
    setLessonMarkdown(content.content);
    setCode(content.starterCode);
    setLessonQuiz(content.quiz);
    setIsProjectMode(!!content.isProject);
    setExplanation(null);
    setAuditResult(null);
    setTerminalLines([]);
    setMobileMenuOpen(false); 
    setActiveMobileTab('learn'); 
  };

  const handleSelectCTF = (ctf: CTFChallenge) => {
    setActiveCTF(ctf);
    setActiveLessonId(null);
    setAppState(AppState.CTF_ARENA);
    setLessonTitle(`Guide: ${ctf.title}`);
    setCode(`# CTF Guide: ${ctf.title}\n# Difficulty: ${ctf.difficulty}\n# Target: ${ctf.targetIP}\n\n# INSTRUCTIONS:\n# 1. Read the 'Step-by-Step Guide' below.\n# 2. Understand how the exploit works.\n# 3. Write the solution code here to practice.\n\nprint("Target Analysis: ${ctf.targetIP}")\n`);
    setExplanation(null);
    setAuditResult(null);
    setTerminalLines([]); 
    setFlagInput("");
    setFlagStatus('idle');
    setShowWalkthrough(true);
    setMobileMenuOpen(false);
    setActiveMobileTab('learn'); 
  };

  const handleFlagSubmit = async () => {
      if (!activeCTF || !userProfile) return;
      if (flagInput.trim() === activeCTF.flag) {
          setFlagStatus('success');
          if (!solvedCTFs.includes(activeCTF.id)) {
              setSolvedCTFs(prev => [...prev, activeCTF.id]);
              const updated = await updateUserProfile({
                  ctfSolved: [...userProfile.ctfSolved, activeCTF.id]
              });
              await addXP(activeCTF.xpReward);
              setUserProfile(updated);
              setTerminalLines(prev => [...prev, { type: 'success', content: `[+] FLAG CAPTURED: ${activeCTF.flag}\n[+] REWARD: +${activeCTF.xpReward} XP` }]);
          }
      } else {
          setFlagStatus('error');
          setTimeout(() => setFlagStatus('idle'), 2000);
      }
  };

  const handleSolve = async (type: 'reverse'|'crypto'|'vuln'|'social'|'signal', challenge: any) => {
      if(!userProfile) return;
      let updates: Partial<UserProfile> = {};
      if(type === 'reverse') updates = { reverseSolved: [...(userProfile.reverseSolved || []), challenge.id] };
      if(type === 'crypto') updates = { cryptoSolved: [...(userProfile.cryptoSolved || []), challenge.id] };
      if(type === 'vuln') updates = { vulnSolved: [...(userProfile.vulnSolved || []), challenge.id] };
      if(type === 'social') updates = { socialSolved: [...(userProfile.socialSolved || []), challenge.id] };
      if(type === 'signal') updates = { signalSolved: [...(userProfile.signalSolved || []), challenge.id] };
      const updated = await updateUserProfile(updates);
      await addXP(challenge.rewardXP);
      setUserProfile(updated);
  };

  const advanceToNextLesson = () => {
      const currentIndex = syllabus.findIndex(s => s.id === activeLessonId);
      if (currentIndex !== -1 && currentIndex < syllabus.length - 1) {
          const nextLesson = syllabus[currentIndex + 1];
          handleSelectLesson(nextLesson);
      } else {
          setAppState(AppState.DASHBOARD);
      }
  };

  const handleQuizComplete = async (score: number) => {
    if (activeLessonId) {
       await markLessonComplete(activeLessonId, score);
       const profile = await getUserProfile();
       const completed = await getCompletedLessons();
       setUserProfile(profile);
       setCompletedLessons(completed);
    }
  };

  const handleManualComplete = async () => {
    if (activeLessonId) {
        await markLessonComplete(activeLessonId, 100);
        const profile = await getUserProfile();
        const completed = await getCompletedLessons();
        setUserProfile(profile);
        setCompletedLessons(completed);
        advanceToNextLesson();
    }
  };

  const handleProfileUpdate = (updated: UserProfile) => setUserProfile(updated);
  const handlePassExam = async () => {
      const profile = await getUserProfile();
      setUserProfile(profile);
      setAppState(AppState.CERTIFICATE);
  };

  const handleTerminalCommand = async (cmd: string) => {
      try {
          const result = await executeCommand(cmd, code, activeCTF?.id);
          if (result) setTerminalLines(prev => [...prev, { type: 'output', content: result }]);
      } catch (e: any) {
          setTerminalLines(prev => [...prev, { type: 'error', content: String(e) }]);
      }
  };

  const handleRunCode = async () => {
    if (!code.trim()) return;
    setIsRunning(true);
    setTerminalLines(prev => [...prev, { type: 'input', content: 'python3 script.py' }]); 
    try {
        const output = await executeCommand('python3', code, activeCTF?.id);
        setTerminalLines(prev => [...prev, { type: 'output', content: output }]);
    } catch (e: any) {
        setTerminalLines(prev => [...prev, { type: 'error', content: String(e) }]);
    } finally {
        setIsRunning(false);
    }
  };

  const handleExplainCode = async () => {
    if (!code.trim()) return;
    setIsExplaining(true);
    const result = await explainCodeLogic(code, language);
    setExplanation(result);
    setIsExplaining(false);
  };

  const handleAuditCode = async () => {
    if (!code.trim()) return;
    setIsAuditing(true);
    const result = await auditCodeSecurity(code);
    setAuditResult(result);
    setIsAuditing(false);
  };

  const handleApiKeySave = (key: string) => {
    localStorage.setItem('cipher_ai_key', key);
    setShowApiKeyModal(false);
  };

  const handleCertificateAccess = () => {
      if (userProfile?.isCertified) {
          setAppState(AppState.CERTIFICATE);
      } else {
          alert("Access Denied: You must pass the Final Certification Exam first.");
      }
      setMobileMenuOpen(false); 
      setActiveMobileTab('learn');
  };

  const getDifficultyColor = (diff: string) => {
    switch(diff) {
        case 'Beginner': return 'bg-gray-800 text-gray-400 border-gray-700';
        case 'Easy': return 'bg-brand/10 text-brand border-brand/20';
        case 'Medium': return 'bg-yellow-900/20 text-yellow-500 border-yellow-500/20';
        case 'Hard': return 'bg-red-900/20 text-red-500 border-red-500/20';
        case 'Insane': return 'bg-purple-900/20 text-purple-500 border-purple-500/20';
        default: return 'bg-gray-800 text-gray-400';
    }
  };

  const SidebarContent = () => (
      <div className="flex-1 overflow-y-auto p-3 scrollbar-thin pb-20 md:pb-3">
           <div className="space-y-1 mb-6">
               <p className="px-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 font-mono">System</p>
               <button onClick={() => {setAppState(AppState.DASHBOARD); setActiveCTF(null); setActiveLessonId(null); setMobileMenuOpen(false); setActiveMobileTab('learn');}} className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors ${appState === AppState.DASHBOARD ? 'bg-brand/10 text-brand border border-brand/20' : 'text-gray-400 hover:bg-[#111]'}`}>
                   <Activity size={16} /> Mission Control
               </button>
               <button onClick={() => {setAppState(AppState.CTF_ARENA); setActiveCTF(null); setMobileMenuOpen(false); setActiveMobileTab('learn');}} className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors ${appState === AppState.CTF_ARENA ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'text-gray-400 hover:bg-[#111]'}`}>
                   <Flag size={16} /> CTF Arena
               </button>
               <button onClick={() => {setAppState(AppState.CIPHER_ROOM); setMobileMenuOpen(false); setActiveMobileTab('learn');}} className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors ${appState === AppState.CIPHER_ROOM ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' : 'text-gray-400 hover:bg-[#111]'}`}>
                   <Lock size={16} /> Cipher Room
               </button>
           </div>
           
           <div className="space-y-1 mb-6">
               <p className="px-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 font-mono">Credential</p>
               <button onClick={() => {setAppState(AppState.FINAL_EXAM); setMobileMenuOpen(false); setActiveMobileTab('learn');}} className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors ${appState === AppState.FINAL_EXAM ? 'bg-white text-black' : 'text-gray-400 hover:bg-[#111]'}`}>
                   <ShieldCheck size={16} className={userProfile?.isCertified ? "text-green-500" : "text-gray-400"} /> 
                   Certification
               </button>
               <button onClick={handleCertificateAccess} className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors ${appState === AppState.CERTIFICATE ? 'bg-brand/10 text-brand' : 'text-gray-400 hover:bg-[#111]'}`}>
                   <Award size={16} className={userProfile?.isCertified ? "text-brand" : "text-gray-400"} /> 
                   My Credential {userProfile?.isCertified ? "" : "(Locked)"}
               </button>
               <button onClick={() => setShowApiKeyModal(true)} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium text-gray-400 hover:bg-[#111] transition-colors">
                   <Key size={16} /> API Key
               </button>
           </div>
       </div>
  );

  if (appState === AppState.ONBOARDING) return <Onboarding onComplete={handleOnboardingComplete} />;

  return (
    <div className={isDarkMode ? "dark" : ""}>
    <div className="h-[100dvh] w-screen flex flex-col bg-white dark:bg-[#030303] text-gray-900 dark:text-gray-200 overflow-hidden font-sans selection:bg-brand/30 transition-colors duration-300">
      
      {/* API Key Modal */}
      <ApiKeyModal 
        isOpen={showApiKeyModal} 
        onClose={() => setShowApiKeyModal(false)} 
        onSave={handleApiKeySave} 
        currentKey={localStorage.getItem('cipher_ai_key') || ''}
      />

      {/* MOBILE OVERLAY SIDEBAR */}
      {mobileMenuOpen && (
          <div className="absolute inset-0 z-[60] flex">
              <div className="w-72 bg-[#f8f9fa] dark:bg-[#0a0a0a] border-r border-gray-200 dark:border-[#27272a] h-full flex flex-col animate-in slide-in-from-left duration-200 shadow-2xl">
                  <div className="p-4 border-b border-gray-200 dark:border-[#27272a] flex justify-between items-center bg-white dark:bg-[#050505]">
                      <div className="flex items-center gap-2">
                          <Logo className="w-6 h-6 text-brand" />
                          <div className="flex flex-col">
                            <span className="font-bold text-sm leading-none text-gray-900 dark:text-white font-serif">Cipher Academy</span>
                            <span className="text-[10px] text-gray-500 tracking-wider">ELITE EDITION</span>
                          </div>
                      </div>
                      <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-[#111] rounded-full text-gray-500 dark:text-gray-400"><X size={18} /></button>
                  </div>
                  <SidebarContent />
                  {userProfile && (
                    <div className="p-4 border-t border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#050505] mt-auto">
                        <button onClick={() => {setAppState(AppState.PROFILE_SETTINGS); setMobileMenuOpen(false); setActiveMobileTab('learn');}} className="flex items-center gap-3 w-full">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-brand/10 border border-brand/30">
                                {userProfile.avatar ? <img src={userProfile.avatar} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full font-bold text-brand">{userProfile.username.charAt(0)}</div>}
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="text-sm font-bold text-gray-900 dark:text-white">{userProfile.username}</div>
                                <div className="text-[10px] text-brand">{userProfile.rankTitle}</div>
                            </div>
                        </button>
                    </div>
                  )}
              </div>
              <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          </div>
      )}

      {/* HEADER */}
      <header className={`h-12 flex-none border-b border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#050505] flex items-center justify-between px-4 z-30 transition-colors ${activeMobileTab !== 'learn' ? 'hidden md:flex' : 'flex'}`}>
           <div className="flex items-center gap-3">
             <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-[#111] transition-colors text-gray-600 dark:text-gray-300">
               <Menu size={20} />
             </button>
             <div className="flex items-center gap-2 md:hidden">
                <Logo className="w-5 h-5 text-brand" />
                <h1 className="font-bold text-sm tracking-tight text-gray-900 dark:text-white font-serif">Cipher Academy</h1>
             </div>
             <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden md:block p-1 rounded hover:bg-gray-100 dark:hover:bg-[#111] transition-colors text-gray-500 dark:text-gray-400">
               {sidebarOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
             </button>
           </div>

           <div className="flex items-center gap-4">
              {/* Dark/Light Mode Toggle - RESTORED */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)} 
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#111] text-gray-500 dark:text-gray-400 hover:text-brand transition-colors"
                title="Toggle Theme"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-[#111] rounded border border-gray-200 dark:border-gray-700">
                  <Flame size={12} className="text-orange-500 fill-orange-500" />
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{userProfile?.streak || 1}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-[#111] rounded border border-gray-200 dark:border-gray-700">
                  <Zap size={12} className="text-brand fill-brand" />
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{userProfile?.xp || 0} XP</span>
              </div>
           </div>
      </header>

      {/* --- MAIN BODY --- */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* DESKTOP SIDEBAR */}
        <div className={`hidden md:flex ${sidebarOpen ? 'w-64' : 'w-0'} flex-none transition-all duration-300 bg-gray-50 dark:bg-[#0a0a0a] border-r border-gray-200 dark:border-[#27272a] flex-col overflow-hidden`}>
           <SidebarContent />
           {userProfile && (
             <button onClick={() => setAppState(AppState.PROFILE_SETTINGS)} className="p-4 border-t border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#050505] hover:bg-gray-100 dark:hover:bg-[#111] transition-colors text-left">
                 <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold overflow-hidden border border-brand/30">
                         {userProfile.avatar ? (
                             <img src={userProfile.avatar} alt="User" className="w-full h-full object-cover" />
                         ) : (
                             userProfile.username.charAt(0)
                         )}
                     </div>
                     <div className="flex-1 min-w-0">
                         <div className="text-xs font-bold truncate text-gray-900 dark:text-white">{userProfile.username}</div>
                         <div className="text-[10px] text-gray-500 truncate">{userProfile.rankTitle}</div>
                     </div>
                     <Settings size={14} className="text-gray-500" />
                 </div>
             </button>
           )}
        </div>

        {/* CONTENT AREA */}
        <div className="hidden md:flex flex-1 flex-col md:flex-row overflow-hidden relative">
            <div className="flex-1 flex flex-col bg-white dark:bg-[#030303] min-w-0 overflow-hidden">
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                    {appState === AppState.DASHBOARD && (
                         <div className="max-w-4xl mx-auto">
                            <div className="flex justify-between items-center mb-8 border-b border-gray-200 dark:border-[#27272a] pb-4">
                                <h2 className="text-2xl font-bold font-serif text-gray-900 dark:text-white">Career Roadmap</h2>
                                <button onClick={handleSwitchTrack} className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-bold transition-all ${userProfile?.isBeginner ? 'bg-brand/10 border-brand text-brand' : 'bg-gray-100 dark:bg-[#111] border-gray-300 dark:border-[#333] text-gray-500 dark:text-gray-400'}`}>
                                    {userProfile?.isBeginner ? <ToggleLeft size={16}/> : <ToggleRight size={16}/>}
                                    {userProfile?.isBeginner ? "Beginner" : "Advanced"}
                                </button>
                            </div>
                            <LearningRoadmap syllabus={syllabus} completedIds={completedLessons} onSelect={handleSelectLesson} activeId={activeLessonId} />
                         </div>
                    )}
                    {appState === AppState.PROFILE_SETTINGS && userProfile && <ProfileSettings user={userProfile} onUpdate={handleProfileUpdate} />}
                    {appState === AppState.FINAL_EXAM && userProfile && <FinalExam user={userProfile} onPass={handlePassExam} />}
                    {appState === AppState.CERTIFICATE && userProfile && <Certificate user={userProfile} courseName="Ethical Hacking Mastery" date={new Date().toLocaleDateString()} />}
                    
                    {appState === AppState.CTF_ARENA && activeCTF && (
                        <div className="max-w-4xl mx-auto animate-in slide-in-from-right duration-300 pb-20">
                            <button onClick={() => setActiveCTF(null)} className="mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"><ArrowLeft size={16} /> Back to Guides</button>
                            
                            {/* ENHANCED CTF CONTAINER - LIGHT/DARK MODE FIX */}
                            <div className="rounded-xl p-8 shadow-lg relative overflow-hidden bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#27272a]">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif">{activeCTF.title}</h2>
                                
                                {/* MARKDOWN RENDERER WITH PROSE-GRAY AND DARK INVERT */}
                                <div className="prose prose-sm md:prose-base max-w-none mb-8 break-words text-gray-700 dark:text-gray-400 leading-relaxed dark:prose-invert prose-headings:font-serif">
                                    <ReactMarkdown components={MarkdownComponents}>{activeCTF.description}</ReactMarkdown>
                                </div>
                                
                                <div className="p-4 border border-gray-200 dark:border-[#27272a] rounded-lg bg-gray-50 dark:bg-[#050505]">
                                    <div className="flex gap-2 items-center">
                                        <input type="text" value={flagInput} onChange={(e) => setFlagInput(e.target.value)} placeholder="CIPHER-CTF{...}" className={`flex-1 bg-white dark:bg-[#0a0a0a] border rounded px-3 py-2 text-gray-900 dark:text-white font-mono text-sm outline-none transition-all ${flagStatus === 'error' ? 'border-red-500 ring-1 ring-red-500 animate-pulse' : 'border-gray-300 dark:border-[#27272a] focus:border-brand'}`} />
                                        <button onClick={handleFlagSubmit} className="bg-gray-900 dark:bg-white text-white dark:text-black font-bold px-4 py-2 rounded text-sm hover:opacity-90 flex items-center gap-2">
                                            {flagStatus === 'success' ? <Check size={16} className="text-green-500" /> : flagStatus === 'error' ? <AlertTriangle size={16} className="text-red-500" /> : <Send size={16} />}
                                            {flagStatus === 'success' ? "CAPTURED" : "Submit"}
                                        </button>
                                    </div>
                                    {flagStatus === 'success' && <p className="text-green-500 text-xs mt-2 font-bold animate-bounce">Access Granted! +{activeCTF.xpReward} XP</p>}
                                    {flagStatus === 'error' && <p className="text-red-500 text-xs mt-2 font-bold">Incorrect Flag. Try again.</p>}
                                </div>
                            </div>
                        </div>
                    )}
                    {appState === AppState.CTF_ARENA && !activeCTF && (
                        <div className="grid grid-cols-2 gap-4">
                            {CTF_CHALLENGES.map(ctf => (
                                <button key={ctf.id} onClick={() => handleSelectCTF(ctf)} className="p-6 border border-gray-200 dark:border-[#27272a] bg-white dark:bg-[#0a0a0a] rounded-xl text-left hover:border-brand/50 transition-all group shadow-sm">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand transition-colors font-serif">{ctf.title}</h3>
                                    <span className={`text-[10px] px-2 py-0.5 rounded border mt-2 inline-block ${getDifficultyColor(ctf.difficulty)}`}>{ctf.difficulty}</span>
                                </button>
                            ))}
                        </div>
                    )}
                    {appState === AppState.CIPHER_ROOM && userProfile && <CipherRoom user={userProfile} onSolveReverse={(c) => handleSolve('reverse', c)} onSolveCrypto={(c) => handleSolve('crypto', c)} onSolveVuln={(c) => handleSolve('vuln', c)} onSolveSocial={(c) => handleSolve('social', c)} onSolveSignal={(c) => handleSolve('signal', c)} />}
                    {appState === AppState.LESSON_VIEW && (
                        <div className="max-w-3xl mx-auto w-full">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-[#27272a] font-serif">{lessonTitle}</h2>
                            <div className="prose prose-sm md:prose-base max-w-full break-words overflow-hidden text-gray-700 dark:text-gray-400 dark:prose-invert">
                                <ReactMarkdown components={MarkdownComponents}>{lessonMarkdown}</ReactMarkdown>
                            </div>
                            {lessonQuiz && lessonQuiz.length > 0 ? (
                                <div className="mt-12"><Quiz questions={lessonQuiz} onComplete={handleQuizComplete} onSkip={() => handleQuizComplete(0)} /></div>
                            ) : (
                                <button onClick={handleManualComplete} className="w-full mt-12 bg-brand text-black py-3 rounded font-bold hover:bg-[#b08d4a] transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand/10">
                                    <CheckCircle size={18} /> Complete & Continue
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="w-1/2 flex flex-col border-l border-gray-200 dark:border-[#27272a] bg-[#050505]">
                <div className="flex-1 flex flex-col min-h-0 relative">
                    <CodeEditor code={code} onChange={setCode} onExplain={handleExplainCode} onAudit={handleAuditCode} isExplaining={isExplaining} isAuditing={isAuditing} />
                    {(explanation || auditResult) && <div className="absolute bottom-0 left-0 right-0 max-h-[60%] bg-[#111] border-t border-[#27272a] p-4 overflow-y-auto z-20"><button onClick={() => {setExplanation(null); setAuditResult(null)}} className="text-xs hover:text-red-500 mb-2">Close</button><div className="prose prose-sm prose-invert"><ReactMarkdown>{explanation || auditResult || ""}</ReactMarkdown></div></div>}
                </div>
                <div className="h-[40%] min-h-[250px] border-t border-gray-800 flex flex-col"><Terminal lines={terminalLines} onRun={handleRunCode} onClear={() => setTerminalLines([])} onCommand={handleTerminalCommand} isRunning={isRunning} /></div>
            </div>
        </div>

        {/* MOBILE LAYOUT */}
        <div className="md:hidden flex-1 flex flex-col w-full h-full overflow-hidden bg-white dark:bg-[#030303]">
            {activeMobileTab === 'learn' && (
                <div className="flex-1 overflow-y-auto p-4 pb-24 w-full animate-in fade-in duration-300">
                    {appState === AppState.DASHBOARD && (
                         <div className="mt-2">
                            <div className="p-6 rounded-xl mb-8 relative overflow-hidden bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#27272a] shadow-lg">
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand/5 rounded-full blur-2xl"></div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white font-serif mb-1">Welcome, {userProfile?.username}</h2>
                                <p className="text-gray-500 text-xs mb-4">Current progress</p>
                                <div className="w-full bg-gray-100 dark:bg-[#111] h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-brand h-full" style={{ width: `${(completedLessons.length / syllabus.length) * 100}%` }}></div>
                                </div>
                            </div>
                            <LearningRoadmap syllabus={syllabus} completedIds={completedLessons} onSelect={handleSelectLesson} activeId={activeLessonId} />
                         </div>
                    )}
                    {appState === AppState.CTF_ARENA && !activeCTF && (
                        <div className="grid grid-cols-1 gap-3 pb-20">
                             {CTF_CHALLENGES.map(ctf => (
                                <button key={ctf.id} onClick={() => handleSelectCTF(ctf)} className="p-4 border border-gray-200 dark:border-[#27272a] rounded-lg text-left bg-white dark:bg-[#0a0a0a] active:scale-95 transition-transform shadow-sm">
                                    <div className="font-bold text-gray-900 dark:text-white flex justify-between text-sm">
                                        {ctf.title}
                                        {solvedCTFs.includes(ctf.id) && <CheckCircle size={16} className="text-brand"/>}
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <span className={`text-[10px] px-2 py-0.5 rounded border ${getDifficultyColor(ctf.difficulty)}`}>{ctf.difficulty}</span>
                                        <span className="text-[10px] text-gray-500 px-2 py-0.5">{ctf.xpReward} XP</span>
                                    </div>
                                </button>
                             ))}
                        </div>
                    )}
                    {appState === AppState.CTF_ARENA && activeCTF && (
                        <div className="pb-20">
                            <button onClick={() => setActiveCTF(null)} className="mb-4 text-sm text-gray-500 flex items-center gap-2"><ArrowLeft size={16}/> Back</button>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 font-serif">{activeCTF.title}</h2>
                            {/* REPLACED PLAIN TEXT PARAGRAPH WITH MARKDOWN RENDERER IN MOBILE VIEW TOO */}
                            <div className="prose prose-sm max-w-none mb-6 break-words text-gray-700 dark:text-gray-400 leading-relaxed dark:prose-invert">
                                <ReactMarkdown components={MarkdownComponents}>{activeCTF.description}</ReactMarkdown>
                            </div>
                            <div className="mb-6 p-4 rounded-lg bg-gray-50 dark:bg-[#050505] border border-gray-200 dark:border-[#27272a]">
                                <div className="flex gap-2 items-center">
                                    <input type="text" value={flagInput} onChange={(e) => setFlagInput(e.target.value)} placeholder="CIPHER-CTF{...}" className={`flex-1 border rounded px-3 py-2 text-sm bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-mono outline-none transition-all ${flagStatus === 'error' ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 dark:border-[#27272a] focus:border-brand'}`} />
                                    <button onClick={handleFlagSubmit} className="bg-gray-900 dark:bg-white text-white dark:text-black px-4 rounded font-bold text-sm h-[38px] flex items-center justify-center min-w-[50px]">
                                        {flagStatus === 'success' ? <Check size={16} className="text-green-500" /> : <Send size={16} />}
                                    </button>
                                </div>
                                {flagStatus === 'success' && <p className="text-green-500 text-xs mt-2 font-bold text-center">Correct! +{activeCTF.xpReward} XP</p>}
                                {flagStatus === 'error' && <p className="text-red-500 text-xs mt-2 font-bold text-center">Incorrect Flag</p>}
                            </div>
                        </div>
                    )}
                    {appState === AppState.CIPHER_ROOM && userProfile && <CipherRoom user={userProfile} onSolveReverse={(c) => handleSolve('reverse', c)} onSolveCrypto={(c) => handleSolve('crypto', c)} onSolveVuln={(c) => handleSolve('vuln', c)} onSolveSocial={(c) => handleSolve('social', c)} onSolveSignal={(c) => handleSolve('signal', c)} />}
                    {appState === AppState.LESSON_VIEW && (
                        <div className="pb-20 w-full">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-[#27272a] font-serif break-words">{lessonTitle}</h2>
                            <div className="prose prose-sm max-w-full break-words overflow-hidden text-gray-700 dark:text-gray-400 dark:prose-invert">
                                <ReactMarkdown components={MarkdownComponents}>{lessonMarkdown}</ReactMarkdown>
                            </div>
                            {lessonQuiz && lessonQuiz.length > 0 ? (
                                <div className="mt-8"><Quiz questions={lessonQuiz} onComplete={handleQuizComplete} onSkip={() => handleQuizComplete(0)} /></div>
                            ) : (
                                <button onClick={handleManualComplete} className="w-full mt-8 bg-brand text-black py-3 rounded font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand/10">
                                    <CheckCircle size={18}/> Complete & Continue
                                </button>
                            )}
                        </div>
                    )}
                    {appState === AppState.PROFILE_SETTINGS && userProfile && <ProfileSettings user={userProfile} onUpdate={handleProfileUpdate} />}
                    {appState === AppState.FINAL_EXAM && userProfile && <FinalExam user={userProfile} onPass={handlePassExam} />}
                    {appState === AppState.CERTIFICATE && userProfile && <Certificate user={userProfile} courseName="Ethical Hacking Mastery" date={new Date().toLocaleDateString()} />}
                </div>
            )}
            {activeMobileTab === 'hack' && (
                <div className="flex-1 flex flex-col w-full h-full bg-[#050505] animate-in slide-in-from-right duration-300">
                    <div className="flex-1 flex flex-col min-h-0 relative">
                        <CodeEditor code={code} onChange={setCode} onExplain={handleExplainCode} onAudit={handleAuditCode} isExplaining={isExplaining} isAuditing={isAuditing} />
                        {(explanation || auditResult) && <div className="absolute bottom-0 left-0 right-0 max-h-[60%] bg-[#111] border-t border-[#27272a] p-4 overflow-y-auto z-20 shadow-2xl"><button onClick={() => {setExplanation(null); setAuditResult(null)}} className="text-xs text-red-400 mb-2 font-bold uppercase">Close Report</button><div className="prose prose-sm prose-invert"><ReactMarkdown>{explanation || auditResult || ""}</ReactMarkdown></div></div>}
                    </div>
                    <div className="h-[35%] border-t border-[#27272a] flex flex-col pb-20">
                        <Terminal lines={terminalLines} onRun={handleRunCode} onClear={() => setTerminalLines([])} onCommand={handleTerminalCommand} isRunning={isRunning} />
                    </div>
                </div>
            )}
            {activeMobileTab === 'ai' && (
                <div className="flex-1 h-full w-full bg-white dark:bg-[#050505] animate-in fade-in duration-300 pb-20 pt-safe">
                    <AITutor initialContext={lessonTitle} onOpenApiKey={() => setShowApiKeyModal(true)} />
                </div>
            )}
        </div>

        {/* MOBILE BOTTOM NAV */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-[60px] bg-white/95 dark:bg-[#050505]/95 backdrop-blur-md border-t border-gray-200 dark:border-[#27272a] flex justify-around items-center px-2 z-50 pb-safe">
            <button onClick={() => setActiveMobileTab('learn')} className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-300 ${activeMobileTab === 'learn' ? 'text-brand' : 'text-gray-500'}`}>
                <MapPin size={20} />
                <span className="text-[10px] font-bold tracking-wide">Map</span>
            </button>
            <button onClick={() => setActiveMobileTab('hack')} className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-300 ${activeMobileTab === 'hack' ? 'text-brand' : 'text-gray-500'}`}>
                <TerminalIcon size={20} />
                <span className="text-[10px] font-bold tracking-wide">Console</span>
            </button>
            <button onClick={() => setActiveMobileTab('ai')} className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-300 ${activeMobileTab === 'ai' ? 'text-brand' : 'text-gray-500'}`}>
                <MessageSquare size={20} />
                <span className="text-[10px] font-bold tracking-wide">AI</span>
            </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default App;
