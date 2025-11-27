import { LucideIcon } from 'lucide-react';

export interface Upgrade {
  id: string;
  name: string;
  baseCost: number;
  gps: number; // Ganancia por segundo
  count: number;
  iconName: 'Cpu' | 'Zap' | 'Anchor' | 'Clock' | 'Activity';
  description: string;
}

export interface GameState {
  entropy: number;
  lastTick: number;
}
