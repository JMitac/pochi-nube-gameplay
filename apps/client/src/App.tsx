import type { ComponentType } from 'react';
import { StageViewport } from './components/ui/StageViewport';
import { useAudioUnlock, useAudioVolumes } from './hooks/useAudioUnlock';
import { useMatchFlow } from './hooks/useMatchFlow';
import { CreateRoomScreen } from './screens/createRoom/CreateRoomScreen';
import { GameScreen } from './screens/game/GameScreen';
import { HowToPlayScreen } from './screens/howToPlay/HowToPlayScreen';
import { JoinRoomScreen } from './screens/joinRoom/JoinRoomScreen';
import { MainMenuScreen } from './screens/menu/MainMenuScreen';
import { ResultsScreen } from './screens/results/ResultsScreen';
import { SettingsScreen } from './screens/settings/SettingsScreen';
import { TitleScreen } from './screens/title/TitleScreen';
import { WaitingRoomScreen } from './screens/waitingRoom/WaitingRoomScreen';
import { useNavigationStore, type ScreenId } from './state/navigationStore';

/** One component per artboard of the design. */
const SCREENS: Record<ScreenId, ComponentType> = {
  title: TitleScreen,
  menu: MainMenuScreen,
  createRoom: CreateRoomScreen,
  joinRoom: JoinRoomScreen,
  waitingRoom: WaitingRoomScreen,
  settings: SettingsScreen,
  howToPlay: HowToPlayScreen,
  game: GameScreen,
  results: ResultsScreen,
};

export function App() {
  const screen = useNavigationStore((state) => state.screen);
  useAudioUnlock();
  useAudioVolumes();
  useMatchFlow();

  const Screen = SCREENS[screen];
  return (
    <StageViewport>
      <Screen />
    </StageViewport>
  );
}
