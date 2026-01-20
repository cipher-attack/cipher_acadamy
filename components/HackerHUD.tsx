import React, { useEffect, useState } from 'react';
import { Activity, Wifi, Shield, Server, Globe, Cpu } from 'lucide-react';
import { NetworkNode } from '../types';

interface HackerHUDProps {
  isRunning: boolean;
}

const HackerHUD: React.FC<HackerHUDProps> = ({ isRunning }) => {
  const [nodes, setNodes] = useState<NetworkNode[]>([
    { id: 'atk', label: 'YOU (Kali)', type: 'attacker', status: 'idle' },
    { id: 'fw', label: 'Firewall', type: 'firewall', status: 'secure' },
    { id: 'tgt', label: 'Target DB', type: 'target', status: 'idle' }
  ]);
  
  const [cpuUsage, setCpuUsage] = useState(12);
  const [netTraffic, setNetTraffic] = useState<number[]>(new Array(20).fill(10));

  // Simulation Effect
  useEffect(() => {
    const interval = setInterval(() => {
       // CPU Randomizer
       setCpuUsage(prev => isRunning ? Math.min(100, Math.max(40, prev + (Math.random() * 20 - 10))) : Math.max(5, prev + (Math.random() * 10 - 5)));
       
       // Network Traffic Graph
       setNetTraffic(prev => {
          const newVal = isRunning ? Math.random() * 100 : Math.random() * 20;
          return [...prev.slice(1), newVal];
       });

       // Node Animation during execution
       if (isRunning) {
           setNodes(prev => prev.map(n => ({
               ...n,
               status: n.type === 'attacker' ? 'scanning' : (Math.random() > 0.7 ? 'breached' : n.status)
           })));
       } else {
           setNodes(prev => prev.map(n => ({ ...n, status: n.type === 'firewall' ? 'secure' : 'idle' })));
       }

    }, 500);
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="bg-cyber-900 border-l border-cyber-700 h-full flex flex-col p-4 w-64 hidden xl:flex">
        <div className="mb-6">
            <h3 className="text-cyber-accent font-mono text-xs mb-2 flex items-center gap-2">
                <Activity size={14} /> SYSTEM MONITOR
            </h3>
            
            {/* CPU Widget */}
            <div className="bg-cyber-800 p-3 rounded border border-cyber-700 mb-2">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>CPU LOAD</span>
                    <span className={cpuUsage > 80 ? 'text-red-500' : 'text-green-400'}>{Math.round(cpuUsage)}%</span>
                </div>
                <div className="w-full bg-cyber-900 h-1 rounded overflow-hidden">
                    <div className="bg-cyber-accent h-full transition-all duration-300" style={{ width: `${cpuUsage}%` }}></div>
                </div>
            </div>

            {/* Network Widget */}
            <div className="bg-cyber-800 p-3 rounded border border-cyber-700">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>NET TRAFFIC</span>
                    <span className="text-blue-400">{(netTraffic[19] * 0.5).toFixed(1)} Mb/s</span>
                </div>
                <div className="flex items-end gap-0.5 h-8">
                    {netTraffic.map((v, i) => (
                        <div key={i} className="flex-1 bg-blue-500/50" style={{ height: `${v}%` }}></div>
                    ))}
                </div>
            </div>
        </div>

        {/* Cyber Map Visualization */}
        <div className="flex-1 flex flex-col">
            <h3 className="text-cyber-accent font-mono text-xs mb-4 flex items-center gap-2">
                <Globe size={14} /> NETWORK TOPOLOGY
            </h3>
            
            <div className="relative flex-1 bg-cyber-800/50 rounded border border-cyber-700 p-4 flex flex-col items-center justify-between py-10">
                {/* Connecting Lines (Simple SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                    <line x1="50%" y1="15%" x2="50%" y2="50%" stroke={isRunning ? "#00ff9d" : "#333"} strokeWidth="2" strokeDasharray={isRunning ? "5,5" : "0"} className={isRunning ? "animate-pulse" : ""} />
                    <line x1="50%" y1="50%" x2="50%" y2="85%" stroke={isRunning ? "#ff4d4d" : "#333"} strokeWidth="2" />
                </svg>

                {/* Nodes */}
                {nodes.map((node) => (
                    <div key={node.id} className={`relative z-10 flex flex-col items-center transition-all duration-500 ${node.status === 'scanning' ? 'scale-110' : ''}`}>
                        <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center bg-cyber-900 shadow-lg ${
                            node.status === 'idle' ? 'border-gray-600 text-gray-400' :
                            node.status === 'secure' ? 'border-blue-500 text-blue-400 shadow-blue-500/20' :
                            node.status === 'scanning' ? 'border-cyber-accent text-cyber-accent shadow-green-500/40 animate-pulse' :
                            'border-red-500 text-red-500 shadow-red-500/40'
                        }`}>
                            {node.type === 'attacker' && <Cpu size={20} />}
                            {node.type === 'firewall' && <Shield size={20} />}
                            {node.type === 'target' && <Server size={20} />}
                        </div>
                        <span className={`text-[10px] mt-2 font-mono font-bold ${
                             node.status === 'breached' ? 'text-red-500 bg-red-500/10 px-1 rounded' : 'text-gray-400'
                        }`}>
                            {node.label}
                        </span>
                        {node.status === 'breached' && <span className="text-[8px] text-red-400 animate-bounce absolute -right-6 top-0">PWNED!</span>}
                    </div>
                ))}
            </div>
        </div>
        
        <div className="mt-4 text-[10px] text-gray-500 font-mono text-center">
            SECURE CONNECTION ESTABLISHED <br/>
            v2.0.4 ETHICAL_OS
        </div>
    </div>
  );
};

export default HackerHUD;