
import React, { useState } from 'react';
import { Mail, Briefcase, DollarSign, ShoppingBag, Check, Lock, Terminal, CreditCard } from 'lucide-react';
import { Job, ShopItem, UserProfile } from '../types';
import { FREELANCE_JOBS, SHOP_ITEMS } from '../data/gameData';

interface FreelanceModeProps {
  user: UserProfile;
  onAcceptJob: (job: Job) => void;
  onBuyItem: (item: ShopItem) => void;
}

const FreelanceMode: React.FC<FreelanceModeProps> = ({ user, onAcceptJob, onBuyItem }) => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'shop'>('jobs');

  return (
    <div className="flex flex-col h-full bg-canvas dark:bg-[#0d1117]">
      {/* Top Bar */}
      <div className="p-4 border-b border-border dark:border-gray-800 bg-canvas-subtle dark:bg-[#161b22] flex flex-col md:flex-row justify-between items-center shadow-sm gap-4">
        <div className="flex w-full md:w-auto gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <button 
             onClick={() => setActiveTab('jobs')}
             className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded font-bold transition-all text-sm ${activeTab === 'jobs' ? 'bg-accent-blue text-white shadow-md' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'}`}
          >
             <Briefcase size={16} />
             Jobs
          </button>
          <button 
             onClick={() => setActiveTab('shop')}
             className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded font-bold transition-all text-sm ${activeTab === 'shop' ? 'bg-accent-purple text-white shadow-md' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'}`}
          >
             <ShoppingBag size={16} />
             Shop
          </button>
        </div>
        
        <div className="w-full md:w-auto flex items-center justify-center gap-2 bg-green-100 dark:bg-green-900/20 px-4 py-2 rounded-lg border border-green-200 dark:border-green-800">
           <DollarSign className="text-green-600 dark:text-green-400" size={18} />
           <span className="font-mono font-bold text-green-700 dark:text-green-400 text-lg">${user.money.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-canvas dark:bg-[#0d1117] pb-20">
        
        {/* JOBS VIEW */}
        {activeTab === 'jobs' && (
          <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
             <h2 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                 <Mail size={14} /> Available Contracts ({FREELANCE_JOBS.filter(j => !user.jobsCompleted.includes(j.id)).length})
             </h2>
             
             {FREELANCE_JOBS.map(job => {
                 const isCompleted = user.jobsCompleted.includes(job.id);
                 const isLocked = user.level < job.requiredLevel;

                 return (
                     <div key={job.id} className={`relative p-5 rounded-lg border transition-all shadow-sm ${
                         isCompleted ? 'bg-gray-50 dark:bg-gray-800/50 border-border dark:border-gray-700 opacity-60' : 
                         isLocked ? 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30' : 
                         'bg-white dark:bg-[#161b22] border-border dark:border-gray-700 hover:border-accent-blue hover:shadow-md'
                     }`}>
                         <div className="flex justify-between items-start mb-3">
                             <div>
                                 <h3 className={`text-lg font-bold ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>{job.title}</h3>
                                 <div className="text-xs text-accent-blue font-mono mt-1">Client: {job.client}</div>
                             </div>
                             <div className="flex flex-col items-end">
                                 <span className="text-green-600 dark:text-green-400 font-bold font-mono text-lg flex items-center">
                                    <DollarSign size={14} />{job.reward}
                                 </span>
                                 <div className="flex gap-1 mt-1">
                                     {Array(5).fill(0).map((_, i) => (
                                         <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < job.difficulty ? 'bg-red-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                                     ))}
                                 </div>
                             </div>
                         </div>
                         
                         <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-mono border-l-2 border-gray-200 dark:border-gray-700 pl-3 leading-relaxed">
                             {job.description}
                         </p>

                         <div className="flex justify-between items-center mt-4">
                             {isLocked ? (
                                 <span className="text-xs text-red-500 flex items-center gap-1 font-medium">
                                     <Lock size={12} /> Requires Level {job.requiredLevel}
                                 </span>
                             ) : isCompleted ? (
                                 <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 font-bold">
                                     <Check size={14} /> CONTRACT FULFILLED
                                 </span>
                             ) : (
                                 <button 
                                    onClick={() => onAcceptJob(job)}
                                    className="bg-accent-blue hover:bg-blue-600 text-white px-6 py-2 rounded text-sm font-bold flex items-center gap-2 transition-colors ml-auto shadow-sm"
                                 >
                                     <Terminal size={14} /> Accept Contract
                                 </button>
                             )}
                         </div>
                     </div>
                 );
             })}
          </div>
        )}

        {/* SHOP VIEW */}
        {activeTab === 'shop' && (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                 {SHOP_ITEMS.map(item => {
                     const isOwned = user.inventory.includes(item.id);
                     const canAfford = user.money >= item.price;
                     
                     return (
                         <div key={item.id} className="bg-white dark:bg-[#161b22] border border-border dark:border-gray-700 rounded-xl p-5 flex flex-col hover:border-accent-purple transition-all group shadow-sm">
                             <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center border border-border dark:border-gray-700 mb-4 group-hover:border-accent-purple transition-colors">
                                 {item.icon === 'Globe' && <Briefcase className="text-accent-purple" />} 
                                 {item.icon === 'Cpu' && <ShoppingBag className="text-accent-blue" />}
                                 {item.icon === 'Terminal' && <Terminal className="text-brand" />}
                             </div>
                             
                             <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-1">{item.name}</h3>
                             <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-4 flex-1">{item.description}</p>
                             
                             <div className="mt-auto">
                                 {isOwned ? (
                                     <button disabled className="w-full bg-gray-100 dark:bg-gray-800 text-gray-400 py-2 rounded font-bold cursor-not-allowed text-xs">
                                         ALREADY OWNED
                                     </button>
                                 ) : (
                                     <button 
                                        onClick={() => onBuyItem(item)}
                                        disabled={!canAfford}
                                        className={`w-full py-2 rounded font-bold flex items-center justify-center gap-2 transition-all text-sm ${canAfford ? 'bg-accent-purple hover:bg-purple-600 text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 border border-border dark:border-gray-700 cursor-not-allowed'}`}
                                     >
                                         <DollarSign size={14} /> {item.price}
                                         {!canAfford && <span className="text-[10px] ml-1 opacity-70">(Not enough funds)</span>}
                                     </button>
                                 )}
                             </div>
                         </div>
                     );
                 })}
             </div>
        )}

      </div>
    </div>
  );
};

export default FreelanceMode;
