export interface Vector2 {
  x: number;
  y: number;
}

export interface Ellipse {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

export interface Bounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function distance(a: Vector2, b: Vector2): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function clampToBounds(point: Vector2, bounds: Bounds): Vector2 {
  return {
    x: clamp(point.x, bounds.minX, bounds.maxX),
    y: clamp(point.y, bounds.minY, bounds.maxY),
  };
}

/** Normalised distance: < 1 inside the ellipse, 1 on the border. */
export function ellipseRatio(point: Vector2, ellipse: Ellipse): number {
  const dx = (point.x - ellipse.cx) / ellipse.rx;
  const dy = (point.y - ellipse.cy) / ellipse.ry;
  return Math.hypot(dx, dy);
}

export function isInsideEllipse(point: Vector2, ellipse: Ellipse): boolean {
  return ellipseRatio(point, ellipse) < 1;
}

/** Moves a point that ended up inside a solid ellipse back onto its border. */
export function pushOutOfEllipse(point: Vector2, ellipse: Ellipse): Vector2 {
  const ratio = ellipseRatio(point, ellipse);
  if (ratio >= 1) return point;
  if (ratio === 0) return { x: ellipse.cx, y: ellipse.cy - ellipse.ry };
  return {
    x: ellipse.cx + (point.x - ellipse.cx) / ratio,
    y: ellipse.cy + (point.y - ellipse.cy) / ratio,
  };
}

export function normalize(vector: Vector2): Vector2 {
  const length = Math.hypot(vector.x, vector.y);
  if (length <= 1) return vector;
  return { x: vector.x / length, y: vector.y / length };
}
