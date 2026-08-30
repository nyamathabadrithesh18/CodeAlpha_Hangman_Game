export type GamePhase = 'start' | 'playing' | 'won' | 'lost' | 'replay_prompt' | 'exited';

export interface TerminalEntry {
  id: string;
  type: 'system' | 'header' | 'game' | 'input' | 'success' | 'error' | 'warning' | 'info';
  text: string;
  timestamp?: string;
}

export type ActiveTab = 'simulator' | 'code' | 'readme' | 'specs';
