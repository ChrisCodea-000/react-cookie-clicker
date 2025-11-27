import React, { useState, useEffect, useCallback } from 'react';
import { INITIAL_UPGRADES } from './data/upgrades';
import { Upgrade } from './types';
import { calculateCost } from './utils/formatters';
import { ClickOrb } from './components/ClickOrb';
import { UpgradeItem } from './components/UpgradeItem';
import { ProgressBar } from './components/ProgressBar';
import { Terminal, Zap } from 'lucide-react';

function App() {
  // Estado del juego
  const [entropy, setEntropy] = useState<number>(0);
  const [upgrades, setUpgrades] = useState<Upgrade[]>(INITIAL_UPGRADES);
  
  // Estadísticas derivadas
  const gps = upgrades.reduce((total, upg) => total + (upg.gps * upg.count), 0);
  
  // Meta arbitraria para la barra de progreso (ej. 10,000 para empezar)
  const stabilityGoal = 10000;

  // Loop del juego (Tick rate: 100ms para suavidad)
  useEffect(() => {
    if (gps === 0) return;

    const tickRate = 100; // ms
    const entropyPerTick = gps * (tickRate / 1000);

    const interval = setInterval(() => {
      setEntropy(prev => prev + entropyPerTick);
    }, tickRate);

    return () => clearInterval(interval);
  }, [gps]);

  // Manejador de Click Manual
  const handleManualClick = useCallback(() => {
    // Bonus base de 1 + un pequeño porcentaje del GPS para que el click siga siendo relevante
    const clickPower = 1 + (gps * 0.05); 
    setEntropy(prev => prev + clickPower);
  }, [gps]);

  // Manejador de Compra (CORREGIDO)
  const handleBuyUpgrade = (id: string) => {
    // 1. Encontrar la mejora que queremos comprar
    const targetUpgrade = upgrades.find(u => u.id === id);
    
    // Guard clause por seguridad
    if (!targetUpgrade) return;

    // 2. Calcular el costo actual
    const cost = calculateCost(targetUpgrade.baseCost, targetUpgrade.count);
		
    // 3. Verificar si tenemos suficiente entropía
    if (entropy >= cost) {
      // 4. Restar el costo de forma segura usando el estado previo
      setEntropy(prevEntropy => prevEntropy - cost);

      // 5. Actualizar el contador de la mejora
      setUpgrades(prevUpgrades => 
        prevUpgrades.map(upg => {
          if (upg.id === id) {
            return { ...upg, count: upg.count + 1 };
          }
          return upg;
        })
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-hidden flex flex-col md:flex-row">
      
      {/* Left Column: Action Zone */}
      <div className="relative w-full md:w-5/12 lg:w-1/2 p-6 flex flex-col bg-slate-900/50 border-r border-slate-800 shadow-[10px_0_30px_rgba(0,0,0,0.3)] z-10">
        {/* Header */}
        <header className="flex items-center gap-3 mb-8 opacity-80">
          <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <Zap className="text-cyan-400 w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-wider text-white uppercase">Quantum Entropy</h1>
            <p className="text-xs text-cyan-400/60 tracking-[0.3em] uppercase">Stabilizer v1.0</p>
          </div>
        </header>

        {/* Main Interaction */}
        <div className="flex-1 flex flex-col justify-center">
          <ClickOrb onClick={handleManualClick} entropy={entropy} gps={gps} />
        </div>

        {/* Footer Stats / Decor */}
        <div className="mt-8 grid grid-cols-2 gap-4 text-xs font-mono text-slate-500 opacity-50">
          <div className="border-t border-slate-700 pt-2">
            SYSTEM: ONLINE
          </div>
          <div className="border-t border-slate-700 pt-2 text-right">
            LATENCY: 0.0ms
          </div>
        </div>
        
        {/* Background Grid Decor */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.9),rgba(15,23,42,0.9)),url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      </div>

      {/* Right Column: Control Panel */}
      <div className="w-full md:w-7/12 lg:w-1/2 bg-[#0b1120] flex flex-col h-screen md:h-auto overflow-hidden">
        <div className="p-6 md:p-8 h-full flex flex-col">
          
          {/* Progress Section */}
          <div className="mb-8">
            <ProgressBar current={entropy} max={stabilityGoal} />
          </div>

          {/* Upgrades Header */}
          <div className="flex items-center gap-2 mb-6 text-violet-400 border-b border-slate-800 pb-4">
            <Terminal size={20} />
            <h2 className="font-bold uppercase tracking-widest text-sm">Protocolos de Mejora</h2>
          </div>

          {/* Scrollable List */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar pb-20 md:pb-0">
            {upgrades.map(upgrade => (
              <UpgradeItem
                key={upgrade.id}
                upgrade={upgrade}
                canAfford={entropy >= calculateCost(upgrade.baseCost, upgrade.count)}
                onBuy={handleBuyUpgrade}
              />
            ))}
            
            {/* Placeholder for locked items */}
            <div className="p-4 rounded-xl border border-slate-800 border-dashed flex items-center justify-center text-slate-600 text-sm font-mono mt-4 opacity-50">
              [ DATOS CORRUPTOS - MÁS ENTROPÍA REQUERIDA ]
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay Gradient for scroll indication */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0b1120] to-transparent pointer-events-none md:hidden"></div>
    </div>
  );
}

export default App;
