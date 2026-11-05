import { describe, expect, it } from 'vitest';
import {
  COUNTDOWN_DURATION_MS,
  MAP_DEFINITIONS,
  MATCH_DURATION_MS,
  type MapId,
  type ServerEventPayloads,
  type ServerEventType,
} from '@pochi/shared';
import { LobbyService } from '../lobby/LobbyService';
import { PicnicState } from '../rooms/schema/PicnicState';
import { FoodState } from '../rooms/schema/WorldEntities';
import { IdGenerator, type MatchContext, type MatchEventSink } from './MatchContext';
import { MatchEngine } from './MatchEngine';

class RecordingEventSink implements MatchEventSink {
  readonly events: Array<{ type: ServerEventType; payload: unknown; to?: string }> = [];

  broadcast<T extends ServerEventType>(type: T, payload: ServerEventPayloads[T]): void {
    this.events.push({ type, payload });
  }

  sendTo<T extends ServerEventType>(sessionId: string, type: T, payload: ServerEventPayloads[T]): void {
    this.events.push({ type, payload, to: sessionId });
  }
}

function createMatch(mode: 'coop' | 'versus' | 'solo' = 'coop', mapId: MapId = 'meadow') {
  const state = new PicnicState();
  state.mode = mode;
  state.mapId = mapId;
  state.maxPlayers = mode === 'solo' ? 1 : 2;
  const events = new RecordingEventSink();
  let seed = 7;
  const context: MatchContext = {
    state,
    map: MAP_DEFINITIONS[mapId],
    events,
    random: { next: () => (seed = (seed * 16807) % 2147483647) / 2147483647 },
    ids: new IdGenerator(),
  };
  const lobby = new LobbyService(state);
  const engine = new MatchEngine(context);
  return { state, events, lobby, engine };
}

function runFor(engine: MatchEngine, totalMs: number, stepMs = 33): void {
  for (let elapsed = 0; elapsed < totalMs; elapsed += stepMs) engine.update(stepMs);
}

describe('MatchEngine', () => {
  it('starts after the countdown and finishes after two minutes', () => {
    const { state, lobby, engine } = createMatch();
    lobby.addPlayer({ sessionId: 'a', name: 'Ana' });
    lobby.addPlayer({ sessionId: 'b', name: 'Beto' });
    expect(lobby.setReady('a', true)).toBe(false);
    expect(lobby.setReady('b', true)).toBe(true);

    engine.startCountdown();
    expect(state.status).toBe('countdown');
    runFor(engine, COUNTDOWN_DURATION_MS + 40);
    expect(state.status).toBe('playing');

    runFor(engine, MATCH_DURATION_MS + 100);
    expect(state.status).toBe('finished');
  });

  it('gives each player a different duck', () => {
    const { state, lobby } = createMatch();
    lobby.addPlayer({ sessionId: 'a', name: 'Ana', preferredDuck: 'nube' });
    lobby.addPlayer({ sessionId: 'b', name: 'Beto' });
    expect(state.players.get('a')?.duckId).toBe('nube');
    expect(state.players.get('b')?.duckId).toBe('pochi');
  });

  it('lets a duck standing under a fruit catch it with together bonus', () => {
    const { state, events, lobby, engine } = createMatch();
    lobby.addPlayer({ sessionId: 'a', name: 'Ana' });
    lobby.addPlayer({ sessionId: 'b', name: 'Beto' });
    engine.startCountdown();
    runFor(engine, COUNTDOWN_DURATION_MS + 40);
    state.foods.clear();

    const pochi = state.players.get('a')!;
    const nube = state.players.get('b')!;
    pochi.x = 300;
    pochi.y = 520;
    nube.x = 340;
    nube.y = 520;

    const pear = new FoodState();
    pear.id = 'test-pear';
    pear.kind = 'pear';
    pear.x = 300;
    pear.y = 520;
    pear.height = 10;
    pear.stage = 'falling';
    pear.fallDurationMs = 10_000;
    pear.stageStartedAtMs = state.elapsedMs - 9_990;
    state.foods.set(pear.id, pear);

    engine.update(1);

    const caught = events.events.find(
      (event) => event.type === 'foodCaught' && (event.payload as { foodId: string }).foodId === 'test-pear',
    );
    expect(caught).toBeDefined();
    expect((caught!.payload as { points: number }).points).toBe(40);
    expect(state.teamScore).toBeGreaterThanOrEqual(40);
  });

  it('only pauses the clock in solo mode', () => {
    const { state, lobby, engine } = createMatch('solo');
    lobby.addPlayer({ sessionId: 'a', name: 'Ana' });
    lobby.setReady('a', true);
    engine.startCountdown();
    runFor(engine, COUNTDOWN_DURATION_MS + 40);
    engine.togglePause();
    const pausedAt = state.elapsedMs;
    runFor(engine, 1_000);
    expect(state.elapsedMs).toBe(pausedAt);
  });
});
