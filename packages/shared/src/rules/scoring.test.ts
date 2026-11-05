import { describe, expect, it } from 'vitest';
import { calculateCatchPoints, calculateStars } from './scoring';
import { resolvePhase } from './matchRules';
import { jumpHeightAt, JUMP_DURATION_MS, JUMP_HEIGHT } from './duckRules';

describe('calculateCatchPoints', () => {
  it('gives double points for a favourite fruit', () => {
    expect(calculateCatchPoints({ foodKind: 'pear', duckId: 'pochi', phaseMultiplier: 1, isTogether: false })).toBe(20);
    expect(calculateCatchPoints({ foodKind: 'pear', duckId: 'nube', phaseMultiplier: 1, isTogether: false })).toBe(10);
  });

  it('stacks the fruit rain and the together multipliers', () => {
    expect(calculateCatchPoints({ foodKind: 'strawberry', duckId: 'nube', phaseMultiplier: 2, isTogether: true })).toBe(80);
  });

  it('never multiplies the rotten apple penalty', () => {
    expect(calculateCatchPoints({ foodKind: 'rottenApple', duckId: 'pochi', phaseMultiplier: 2, isTogether: true })).toBe(-10);
  });
});

describe('calculateStars', () => {
  it('returns stars for coop and none for versus', () => {
    expect(calculateStars(760, 'coop')).toBe(3);
    expect(calculateStars(520, 'coop')).toBe(2);
    expect(calculateStars(100, 'coop')).toBe(0);
    expect(calculateStars(9999, 'versus')).toBe(0);
  });
});

describe('resolvePhase', () => {
  it('follows the three phases of the match', () => {
    expect(resolvePhase(10_000).id).toBe('calm');
    expect(resolvePhase(45_000).id).toBe('tricky');
    expect(resolvePhase(95_000).id).toBe('fruitRain');
  });
});

describe('jumpHeightAt', () => {
  it('peaks in the middle of the jump', () => {
    expect(jumpHeightAt(JUMP_DURATION_MS / 2)).toBeCloseTo(JUMP_HEIGHT);
    expect(jumpHeightAt(JUMP_DURATION_MS + 1)).toBe(0);
  });
});
