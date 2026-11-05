import { useEffect } from 'react';
import { buildMatchResult } from '../domain/matchResult';
import { roomSession } from '../network/RoomSession';
import { useNavigationStore, type ScreenId } from '../state/navigationStore';
import { useResultsStore } from '../state/resultsStore';
import { useRoomStore } from '../state/roomStore';

const ROOM_SCREENS: ScreenId[] = ['waitingRoom', 'game', 'results'];

/**
 * Moves between screens when the room changes state:
 * countdown → game, finished → results, rematch → waiting room, closed → menu.
 */
export function useMatchFlow(): void {
  const status = useRoomStore((state) => state.snapshot?.status);

  useEffect(() => {
    const { screen, navigate } = useNavigationStore.getState();
    if ((status === 'countdown' || status === 'playing') && screen !== 'game') navigate('game');

    if (status === 'finished' && screen === 'game') {
      const state = roomSession.state;
      const mySessionId = roomSession.sessionId;
      if (state && mySessionId) useResultsStore.getState().setLastResult(buildMatchResult(state, mySessionId));
      navigate('results');
    }

    if (status === 'waiting' && (screen === 'game' || screen === 'results')) navigate('waitingRoom');
  }, [status]);

  useEffect(
    () =>
      roomSession.onLeave(() => {
        const { screen, navigate } = useNavigationStore.getState();
        if (ROOM_SCREENS.includes(screen) && screen !== 'results') navigate('menu');
      }),
    [],
  );
}
