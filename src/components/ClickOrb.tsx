import React from 'react';
import { Atom } from 'lucide-react';

interface ClickOrbProps {
  onClick: () => void;
  entropy: number;
  gps: number;
}

export const ClickOrb: React.FC<ClickOrbProps> = ({ onClick, entropy, gps }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full relative z-10">
      {/* Background Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-violet-500/20 rounded-full blur-2xl pointer-events-none"></div>

      {/* Main Orb Button */}
      <button
        onClick={onClick}
        className="group relative w-48 h-48 rounded-full bg-slate-900 border-4 border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.4)] 
                   flex items-center justify-center transition-all duration-100 ease-out
                   hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_70px_rgba(6,182,212,0.6)]
                   active:scale-95 active:border-violet-500 active:shadow-[0_0_30px_rgba(139,92,246,0.6)]
                   focus:outline-none focus:ring-4 focus:ring-cyan-500/30"
      >
        <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute inset-2 rounded-full border border-cyan-500/20 animate-[spin_15s_linear_infinite_reverse]"></div>
        
        <Atom className="w-20 h-20 text-cyan-400 group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
      </button>

      <div className="mt-12 text-center space-y-2">
        <h2 className="text-slate-400 text-sm uppercase tracking-[0.2em] font-medium">Entropía Estabilizada</h2>
        <div className="text-5xl font-bold text-white font-mono tracking-tighter drop-shadow-lg">
          {Math.floor(entropy).toLocaleString()}
        </div>
        <div className="text-cyan-400 font-mono text-sm bg-cyan-950/30 px-4 py-1 rounded-full inline-block border border-cyan-900/50">
          +{gps.toFixed(1)} / seg
        </div>
      </div>
    </div>
  );
};
