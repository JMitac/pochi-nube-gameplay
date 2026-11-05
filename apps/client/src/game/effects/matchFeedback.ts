import { SERVER_EVENTS, type FoodCaughtEvent } from '@pochi/shared';
import { audioEngine } from '../../audio/audioInstance';
import type { SoundEffectId } from '../../audio/soundEffects';
import { PHASE_LABELS } from '../../domain/labels';
import type { RoomSession } from '../../network/RoomSession';
import { useSettingsStore } from '../../state/settingsStore';
import { useFloatingTextStore } from './floatingTextStore';

function vibrate(pattern: number | number[]): void {
  if (useSettingsStore.getState().vibration && 'vibrate' in navigator) navigator.vibrate(pattern);
}

function catchSound(event: FoodCaughtEvent): SoundEffectId {
  if (event.foodKind === 'rottenApple') return 'rotten';
  if (event.foodKind === 'goldenFruit') return 'golden';
  return event.isFavorite ? 'favorite' : 'catch';
}

function formatPoints(points: number): string {
  return points < 0 ? `−${Math.abs(points)}` : `+${points}`;
}

/**
 * Sounds, vibration and floating labels for the server's match events.
 * Returns a function that stops listening.
 */
export function listenToMatchFeedback(session: RoomSession): () => void {
  const floating = useFloatingTextStore.getState();
  const isMine = (sessionId: string) => sessionId === session.sessionId;

  const unsubscribers = [
    session.on(SERVER_EVENTS.foodCaught, (event) => {
      audioEngine.playEffect(catchSound(event));
      if (isMine(event.sessionId)) vibrate(event.points < 0 ? 90 : 20);
      floating.add({
        x: event.position.x,
        y: event.position.y - 150,
        text: formatPoints(event.points),
        tone: event.points < 0 ? 'bad' : event.foodKind === 'goldenFruit' ? 'gold' : 'good',
      });
    }),
    session.on(SERVER_EVENTS.foodLost, () => audioEngine.playEffect('lost')),
    session.on(SERVER_EVENTS.puddleSplash, (event) => {
      audioEngine.playEffect(event.isCold && event.duckId === 'nube' ? 'cold' : 'puddle');
      if (isMine(event.sessionId)) vibrate(60);
    }),
    session.on(SERVER_EVENTS.phaseChanged, (event) => {
      audioEngine.playEffect('phase');
      audioEngine.setIntense(event.phaseId === 'fruitRain');
      floating.showPhaseBanner(PHASE_LABELS[event.phaseId]);
    }),
    session.on(SERVER_EVENTS.comboTriggered, () => audioEngine.playEffect('combo')),
    session.on(SERVER_EVENTS.affectionFull, (event) => {
      if (isMine(event.sessionId)) audioEngine.playEffect('affection');
    }),
    session.on(SERVER_EVENTS.abilityUsed, (event) => audioEngine.playEffect(event.duckId === 'pochi' ? 'snack' : 'plan')),
    session.on(SERVER_EVENTS.jumped, (event) => {
      if (!isMine(event.sessionId)) audioEngine.playEffect('jump');
    }),
    session.on(SERVER_EVENTS.flapHit, (event) => {
      audioEngine.playEffect('puddle');
      if (isMine(event.victimSessionId)) vibrate([40, 30, 40]);
    }),
  ];

  return () => unsubscribers.forEach((unsubscribe) => unsubscribe());
}
