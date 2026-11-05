import { create } from 'zustand';

export type ScreenId =
  'title' | 'menu' | 'createRoom' | 'joinRoom' | 'waitingRoom' | 'settings' | 'howToPlay' | 'game' | 'results';

interface NavigationState {
  screen: ScreenId;
  navigate(screen: ScreenId): void;
}

/** Which of the design's screens is showing. */
export const useNavigationStore = create<NavigationState>((set) => ({
  screen: 'title',
  navigate: (screen) => set({ screen }),
}));
