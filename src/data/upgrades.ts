import { Upgrade } from '../types';

export const INITIAL_UPGRADES: Upgrade[] = [
  {
    id: 'nanobot',
    name: 'Reparación de Nanobots',
    baseCost: 15,
    gps: 0.1,
    count: 0,
    iconName: 'Activity',
    description: 'Bots microscópicos que estabilizan fluctuaciones menores.'
  },
  {
    id: 'server',
    name: 'Servidor Cuántico',
    baseCost: 100,
    gps: 1,
    count: 0,
    iconName: 'Server',
    description: 'Procesamiento paralelo en múltiples realidades.'
  },
  {
    id: 'anchor',
    name: 'Ancla de Realidad',
    baseCost: 1100,
    gps: 8,
    count: 0,
    iconName: 'Anchor',
    description: 'Dispositivo pesado que evita la disolución entrópica.'
  },
  {
    id: 'dilator',
    name: 'Dilatador Temporal',
    baseCost: 12000,
    gps: 47,
    count: 0,
    iconName: 'Clock',
    description: 'Manipula el tiempo para maximizar la estabilidad.'
  }
];
