import React from 'react';
import { Upgrade } from '../types';
import { calculateCost, formatNumber } from '../utils/formatters';
import { Activity, Server, Anchor, Clock, Zap, Cpu } from 'lucide-react';

// Map icon names to components
const IconMap = {
  Activity,
  Server,
  Anchor,
  Clock,
  Zap,
  Cpu
};

interface UpgradeItemProps {
  upgrade: Upgrade;
  canAfford: boolean;
  onBuy: (id: string) => void;
}

export const UpgradeItem: React.FC<UpgradeItemProps> = ({ upgrade, canAfford, onBuy }) => {
  const cost = calculateCost(upgrade.baseCost, upgrade.count);
  const Icon = IconMap[upgrade.iconName] || Zap;

  return (
    <button
      onClick={() => onBuy(upgrade.id)}
      disabled={!canAfford}
      className={`w-full p-4 rounded-xl border transition-all duration-200 flex items-center gap-4 text-left group relative overflow-hidden
        ${canAfford 
          ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] cursor-pointer' 
          : 'bg-slate-900/50 border-slate-800 opacity-60 cursor-not-allowed grayscale-[0.5]'
        }
      `}
    >
      {/* Progress/Fill effect on hover could go here, keeping it simple for now */}
      
      <div className={`p-3 rounded-lg ${canAfford ? 'bg-cyan-950/50 text-cyan-400' : 'bg-slate-800 text-slate-600'}`}>
        <Icon size={24} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-1">
          <h3 className="font-bold text-slate-200 truncate pr-2">{upgrade.name}</h3>
          <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            Lvl {upgrade.count}
          </span>
        </div>
        <p className="text-xs text-slate-400 truncate mb-2">{upgrade.description}</p>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className={`${canAfford ? 'text-violet-400' : 'text-red-400/70'}`}>
            Cost: {formatNumber(cost)} Ent
          </span>
          <span className="text-emerald-400/80">
            +{upgrade.gps} GPS
          </span>
        </div>
      </div>
    </button>
  );
};
