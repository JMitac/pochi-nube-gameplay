import { create } from 'zustand';

export type ScreenId =
  'title' | 'menu' | 'createRoom' | 'joinRoom' | 'waitingRoom' | 'settings' | 'howToPlay' | 'game' | 'results';

interface NavigationState {
  screen: ScreenId;
  previousScreen: ScreenId | null;
  navigate(screen: ScreenId): void;
  goBack(): void;
}

/** Which of the design's screens is showing. */
export const useNavigationStore = create<NavigationState>((set, get) => ({
  screen: 'title',
  previousScreen: null,
  navigate: (screen) => set((state) => ({ screen, previousScreen: state.screen })),
  goBack: () => {
    const { previousScreen } = get();
    if (previousScreen) get().navigate(previousScreen);
  },
}));
