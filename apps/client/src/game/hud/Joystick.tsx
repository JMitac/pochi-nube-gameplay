import { useRef, useState, type PointerEvent } from 'react';
import type { InputState } from '../input/InputState';
import { useStageScale } from '../../components/ui/StageViewport';

const BASE_SIZE = 180;
const KNOB_SIZE = 78;
const MAX_TRAVEL = (BASE_SIZE - KNOB_SIZE) / 2;

/** On-screen stick for phones ("Palanca a la izquierda"). */
export function Joystick({ input, className }: { input: InputState; className: string }) {
  const stageScale = useStageScale();
  const baseRef = useRef<HTMLDivElement>(null);
  const [knobOffset, setKnobOffset] = useState<{ x: number; y: number } | null>(null);
  const [hasBeenUsed, setHasBeenUsed] = useState(false);

  const moveTo = (event: PointerEvent<HTMLDivElement>) => {
    const rect = baseRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = (event.clientX - (rect.left + rect.width / 2)) / stageScale;
    const dy = (event.clientY - (rect.top + rect.height / 2)) / stageScale;
    const length = Math.hypot(dx, dy);
    const limited = length > MAX_TRAVEL ? MAX_TRAVEL / length : 1;
    const offset = { x: dx * limited, y: dy * limited };
    setKnobOffset(offset);
    input.setTouchMovement({ x: offset.x / MAX_TRAVEL, y: offset.y / MAX_TRAVEL });
  };

  const release = () => {
    setKnobOffset(null);
    input.setTouchMovement({ x: 0, y: 0 });
  };

  return (
    <div
      ref={baseRef}
      role="img"
      aria-label="Palanca de movimiento"
      className={`border-ink absolute bottom-9 box-border flex size-[180px] touch-none items-center justify-center rounded-full border-[5px] bg-[rgba(255,255,255,0.45)] ${className}`}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        setHasBeenUsed(true);
        moveTo(event);
      }}
      onPointerMove={(event) => {
        if (knobOffset) moveTo(event);
      }}
      onPointerUp={release}
      onPointerCancel={release}
    >
      <div
        className={`border-ink bg-cream shadow-pop box-border size-[78px] rounded-full border-[5px] ${hasBeenUsed ? '' : 'joystick-hint'}`}
        style={knobOffset ? { transform: `translate(${knobOffset.x}px, ${knobOffset.y}px)` } : undefined}
      />
    </div>
  );
}
