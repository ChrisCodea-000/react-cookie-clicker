import React from 'react';

interface ProgressBarProps {
  current: number;
  max: number; // Un objetivo arbitrario para visualización
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, max }) => {
  // Calculamos el porcentaje, limitado al 100%
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-xs uppercase tracking-widest text-cyan-400 mb-2 font-mono">
        <span>Estabilidad del Sistema</span>
        <span>{percentage.toFixed(1)}%</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700 relative shadow-[0_0_10px_rgba(6,182,212,0.2)]">
        <div 
          className="h-full bg-gradient-to-r from-cyan-600 to-violet-600 transition-all duration-300 ease-out relative"
          style={{ width: `${percentage}%` }}
        >
            <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite] skew-x-12 -ml-full"></div>
        </div>
      </div>
    </div>
  );
};
