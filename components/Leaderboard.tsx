
import React, { useEffect, useState } from 'react';
import { Trophy, Medal, User, RefreshCw } from 'lucide-react';
import { LeaderboardEntry } from '../types';
import { getLeaderboardData } from '../services/dbService';

interface LeaderboardProps {
  currentUserXP: number;
  currentUserName: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ currentUserXP }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
      setLoading(true);
      const data = await getLeaderboardData();
      setEntries(data);
      setLoading(false);
  };

  useEffect(() => {
      fetchLeaderboard();
  }, [currentUserXP]); // Refresh if user XP changes

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
            <Trophy className="text-yellow-500" size={32} />
            Live Global Leaderboard
        </h2>
        <p className="text-gray-500 dark:text-gray-400">Top Hackers currently active in the system.</p>
      </div>

      <div className="bg-white dark:bg-[#161b22] rounded-xl border border-border dark:border-gray-700 overflow-hidden shadow-card">
        <div className="flex justify-between items-center p-4 border-b border-border dark:border-gray-700 bg-gray-50 dark:bg-[#0d1117]">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Ranking Table</span>
            <button onClick={fetchLeaderboard} className="text-gray-500 hover:text-brand transition-colors" title="Refresh">
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
        </div>

        <div className="grid grid-cols-12 gap-4 p-4 border-b border-border dark:border-gray-700 bg-gray-100 dark:bg-[#0d1117] text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider">
            <div className="col-span-2 text-center">Rank</div>
            <div className="col-span-6">Hacker Alias</div>
            <div className="col-span-4 text-right">Total XP</div>
        </div>

        <div className="max-h-[600px] overflow-y-auto">
            {entries.map((user) => (
                <div key={user.username} className={`grid grid-cols-12 gap-4 p-4 items-center border-b border-border dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${user.isUser ? 'bg-brand/10 border-brand/20 dark:bg-brand/5' : ''}`}>
                    <div className="col-span-2 flex justify-center font-bold text-gray-700 dark:text-gray-300">
                        {user.rank === 1 && <Medal className="text-yellow-500" />}
                        {user.rank === 2 && <Medal className="text-gray-400" />}
                        {user.rank === 3 && <Medal className="text-orange-400" />}
                        {user.rank > 3 && <span className="font-mono">#{user.rank}</span>}
                    </div>
                    <div className="col-span-6 flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${user.isUser ? 'bg-brand text-white border-brand' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 border-gray-200 dark:border-gray-700'}`}>
                            <User size={14} />
                        </div>
                        <div className="flex flex-col">
                            <span className={`font-medium text-sm ${user.isUser ? 'text-brand font-bold' : 'text-gray-900 dark:text-white'}`}>
                                {user.username} {user.isUser && "(You)"}
                            </span>
                            <span className="text-[10px] text-gray-400">{user.badge}</span>
                        </div>
                    </div>
                    <div className="col-span-4 text-right font-mono font-bold text-gray-900 dark:text-white">
                        {user.xp.toLocaleString()} XP
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
