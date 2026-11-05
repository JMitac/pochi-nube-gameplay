import { CircleGeometry, Color, DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';
import type { SpriteTexture } from './SpriteTextureCache';

const INK = new Color('#4A3424');

/** A 1×1 textured quad; scale it to the sprite size. */
export function createSpriteMesh(): Mesh {
  const material = new MeshBasicMaterial({ transparent: true, side: DoubleSide, depthTest: false, depthWrite: false });
  return new Mesh(new PlaneGeometry(1, 1), material);
}

/** A soft ink ellipse, used for the shadow that grows where a fruit will land. */
export function createShadowMesh(): Mesh {
  const material = new MeshBasicMaterial({
    color: INK,
    transparent: true,
    side: DoubleSide,
    depthTest: false,
    depthWrite: false,
  });
  return new Mesh(new CircleGeometry(1, 28), material);
}

export function applySpriteTexture(mesh: Mesh, sprite: SpriteTexture | undefined, scale = 1): boolean {
  const material = mesh.material as MeshBasicMaterial;
  if (!sprite) {
    mesh.visible = false;
    return false;
  }
  if (material.map !== sprite.texture) {
    material.map = sprite.texture;
    material.needsUpdate = true;
  }
  // Negative y: the camera has y pointing down (like SVG), so the quad is flipped back upright.
  mesh.scale.set(sprite.width * scale, -sprite.height * scale, 1);
  return true;
}

export function setOpacity(mesh: Mesh, opacity: number): void {
  (mesh.material as MeshBasicMaterial).opacity = opacity;
}
