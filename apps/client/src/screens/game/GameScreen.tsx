import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { DuckId } from '@pochi/shared';
import { audioEngine } from '../../audio/audioInstance';
import { MAP_TRACKS } from '../../audio/tracks';
import { useStageScale } from '../../components/ui/StageViewport';
import { ScreenBackground } from '../../components/ScreenBackground';
import { DuckActor, type DuckActorHandle } from '../../game/actors/DuckActor';
import { listenToMatchFeedback } from '../../game/effects/matchFeedback';
import { useFloatingTextStore } from '../../game/effects/floatingTextStore';
import { ActionButtons } from '../../game/hud/ActionButtons';
import { Joystick } from '../../game/hud/Joystick';
import { MatchStatusPanel } from '../../game/hud/MatchStatusPanel';
import {
  CountdownOverlay,
  FloatingTexts,
  PauseOverlay,
  PhaseBanner,
  TogetherBadge,
  TopRightControls,
} from '../../game/hud/overlays';
import { ScoreBoard } from '../../game/hud/ScoreBoard';
import { InputState } from '../../game/input/InputState';
import { KeyboardController } from '../../game/input/KeyboardController';
import { GameRuntime } from '../../game/runtime/GameRuntime';
import { useScreenMusic } from '../../hooks/useScreenMusic';
import { roomSession } from '../../network/RoomSession';
import { useHudStore } from '../../state/hudStore';
import { useNavigationStore } from '../../state/navigationStore';
import { useRoomStore } from '../../state/roomStore';
import { useSettingsStore } from '../../state/settingsStore';
import { useMatchSounds } from './useMatchSounds';

function pixelRatioFor(quality: 'low' | 'high', stageScale: number): number {
  const deviceRatio = quality === 'high' ? Math.min(window.devicePixelRatio || 1, 1.5) : 1;
  return Math.max(0.5, deviceRatio * stageScale);
}

/** 7 · Juego (HUD y controles) */
export function GameScreen() {
  const navigate = useNavigationStore((state) => state.navigate);
  const snapshot = useRoomStore((state) => state.snapshot);
  const mySessionId = useRoomStore((state) => state.mySessionId);
  const hud = useHudStore((state) => state.hud);
  const quality = useSettingsStore((state) => state.graphicsQuality);
  const isLeftHanded = useSettingsStore((state) => state.handedness === 'left');
  const stageScale = useStageScale();
  const [isPauseOpen, setIsPauseOpen] = useState(false);

  const input = useMemo(() => new InputState(), []);
  const groundCanvasRef = useRef<HTMLCanvasElement>(null);
  const skyCanvasRef = useRef<HTMLCanvasElement>(null);
  const togetherBadgeRef = useRef<HTMLDivElement>(null);
  const duckActors = useRef(new Map<string, DuckActorHandle>());
  const runtimeRef = useRef<GameRuntime | null>(null);

  const mapId = snapshot?.mapId ?? 'meadow';
  const isSolo = snapshot?.mode === 'solo';
  useScreenMusic(MAP_TRACKS[mapId]);
  useMatchSounds(hud);

  const isPauseOpenRef = useRef(false);
  const togglePause = useCallback(() => {
    const next = !isPauseOpenRef.current;
    isPauseOpenRef.current = next;
    setIsPauseOpen(next);
    audioEngine.setPaused(next);
    if (roomSession.state?.mode === 'solo') roomSession.togglePause();
  }, []);

  // Game loop, keyboard and match feedback live as long as this screen.
  useEffect(() => {
    if (!groundCanvasRef.current || !skyCanvasRef.current) return;
    const runtime = new GameRuntime({
      session: roomSession,
      input,
      groundCanvas: groundCanvasRef.current,
      skyCanvas: skyCanvasRef.current,
      pixelRatio: pixelRatioFor(useSettingsStore.getState().graphicsQuality, stageScale),
      antialias: useSettingsStore.getState().graphicsQuality === 'high',
      findDuckActor: (sessionId) => duckActors.current.get(sessionId),
      placeTogetherBadge: (position) => {
        const badge = togetherBadgeRef.current;
        if (!badge) return;
        badge.style.display = position ? 'block' : 'none';
        if (position) badge.style.transform = `translate(${position.x}px, ${position.y}px)`;
      },
      publishHud: (next) => useHudStore.getState().setHud(next),
    });
    runtimeRef.current = runtime;
    runtime.start();
    const detachKeyboard = new KeyboardController(input, togglePause).attach();
    const stopFeedback = listenToMatchFeedback(roomSession);
    if (roomSession.state?.status === 'countdown') audioEngine.playJingle('countdown');

    return () => {
      detachKeyboard();
      stopFeedback();
      runtime.stop();
      runtimeRef.current = null;
      input.reset();
      audioEngine.setIntense(false);
      audioEngine.setPaused(false);
      useHudStore.getState().clear();
      useFloatingTextStore.getState().clear();
    };
    // The runtime is created once; quality and scale changes are applied below.
  }, []);

  useEffect(() => {
    runtimeRef.current?.setPixelRatio(pixelRatioFor(quality, stageScale));
  }, [quality, stageScale]);

  const registerDuck = useCallback(
    (sessionId: string) => (handle: DuckActorHandle | null) => {
      if (handle) duckActors.current.set(sessionId, handle);
      else duckActors.current.delete(sessionId);
    },
    [],
  );

  const quitMatch = async () => {
    audioEngine.setPaused(false);
    await roomSession.leave();
    navigate('menu');
  };

  const players = snapshot?.players ?? [];

  return (
    <div className="bg-sky font-body text-ink relative h-[720px] w-[1280px] select-none overflow-hidden">
      <ScreenBackground mapId={mapId} />
      <canvas ref={groundCanvasRef} className="pointer-events-none absolute left-0 top-0 h-[720px] w-[1280px]" />
      <div className="pointer-events-none absolute inset-0">
        {players.map((player) => (
          <DuckActor key={player.sessionId} ref={registerDuck(player.sessionId)} duckId={player.duckId as DuckId} />
        ))}
      </div>
      <canvas ref={skyCanvasRef} className="pointer-events-none absolute left-0 top-0 z-[800] h-[720px] w-[1280px]" />
      <TogetherBadge ref={togetherBadgeRef} />
      <FloatingTexts />
      <PhaseBanner />

      {hud && mySessionId && (
        <div className="absolute inset-0 z-[980]">
          <ScoreBoard hud={hud} mode={snapshot?.mode ?? 'coop'} mySessionId={mySessionId} />
          <MatchStatusPanel hud={hud} />
          <Joystick input={input} className={isLeftHanded ? 'right-11' : 'left-11'} />
          <ActionButtons hud={hud} input={input} isLeftHanded={isLeftHanded} />
          <CountdownOverlay hud={hud} />
        </div>
      )}
      <TopRightControls roomCode={isSolo ? null : (snapshot?.roomCode ?? null)} onPause={togglePause} />
      {isPauseOpen && <PauseOverlay isSolo={isSolo} onResume={togglePause} onQuit={() => void quitMatch()} />}
    </div>
  );
}
