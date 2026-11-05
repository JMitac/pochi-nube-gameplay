import { create } from 'zustand';

export interface FloatingText {
  id: number;
  x: number;
  y: number;
  text: string;
  tone: 'good' | 'bad' | 'gold';
}

interface FloatingTextState {
  texts: FloatingText[];
  phaseBanner: { id: number; text: string } | null;
  add(text: Omit<FloatingText, 'id'>): void;
  remove(id: number): void;
  showPhaseBanner(text: string): void;
  clear(): void;
}

let nextId = 1;

/** "+40" labels and phase banners that pop up over the game for a moment. */
export const useFloatingTextStore = create<FloatingTextState>((set) => ({
  texts: [],
  phaseBanner: null,
  add: (text) => set((state) => ({ texts: [...state.texts.slice(-11), { ...text, id: nextId++ }] })),
  remove: (id) => set((state) => ({ texts: state.texts.filter((text) => text.id !== id) })),
  showPhaseBanner: (text) => set({ phaseBanner: { id: nextId++, text } }),
  clear: () => set({ texts: [], phaseBanner: null }),
}));
