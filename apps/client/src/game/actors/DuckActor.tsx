import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import type { DuckId } from '@pochi/shared';
import { DuckFigure } from '../../art/ducks/DuckFigure';
import type { DuckDirection, DuckPose } from '../../art/ducks/duckPose';
import { DUCK_QUACK_TEXT } from '../../domain/labels';
import { DUCK_BASE_SIZE, DUCK_FEET_X, DUCK_FEET_Y } from '../render/projection';

export interface DuckLook {
  pose: DuckPose;
  direction: DuckDirection;
  isGlowing: boolean;
  isDizzy: boolean;
}

/** What the game loop can do to a duck on screen, without re-rendering React every frame. */
export interface DuckActorHandle {
  place(x: number, y: number, height: number, scale: number): void;
  setLook(look: DuckLook): void;
  sayQuack(): void;
}

const QUACK_BUBBLE_MS = 1_200;

/** One duck in the game: the design's SVG character, moved by the game loop. */
export const DuckActor = forwardRef<DuckActorHandle, { duckId: DuckId }>(function DuckActor({ duckId }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [look, setLookState] = useState<DuckLook>({
    pose: 'idle',
    direction: duckId === 'nube' ? 'left' : 'right',
    isGlowing: false,
    isDizzy: false,
  });
  const [quackKey, setQuackKey] = useState(0);
  const lastLook = useRef(look);

  useImperativeHandle(
    ref,
    () => ({
      place(x, y, height, scale) {
        const element = containerRef.current;
        if (!element) return;
        element.style.transform = `translate(${x - DUCK_FEET_X}px, ${y - height - DUCK_FEET_Y}px) scale(${scale})`;
        element.style.zIndex = String(Math.round(y));
      },
      setLook(next) {
        const previous = lastLook.current;
        const changed =
          previous.pose !== next.pose ||
          previous.direction !== next.direction ||
          previous.isGlowing !== next.isGlowing ||
          previous.isDizzy !== next.isDizzy;
        if (!changed) return;
        lastLook.current = next;
        setLookState(next);
      },
      sayQuack() {
        setQuackKey((key) => key + 1);
      },
    }),
    [],
  );

  return (
    <div
      ref={containerRef}
      className="absolute left-0 top-0 will-change-transform"
      style={{ transformOrigin: `${DUCK_FEET_X}px ${DUCK_FEET_Y}px` }}
    >
      <div
        className={`${look.isGlowing ? 'duck-glow' : ''} ${look.isDizzy ? 'duck-dizzy' : ''}`}
        style={{ transformOrigin: '50% 90%' }}
      >
        <DuckFigure duckId={duckId} size={DUCK_BASE_SIZE} pose={look.pose} direction={look.direction} />
      </div>
      {quackKey > 0 && (
        <div
          key={quackKey}
          className="speech-pop border-ink font-display text-ink absolute left-1/2 top-[-34px] whitespace-nowrap rounded-[18px] border-[3.5px] bg-white px-3.5 py-1.5 text-[22px] font-extrabold"
          style={{ animationDuration: `${QUACK_BUBBLE_MS}ms` }}
        >
          {DUCK_QUACK_TEXT[duckId]}
        </div>
      )}
    </div>
  );
});
