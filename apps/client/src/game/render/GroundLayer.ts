import { FOOD_SPRITES, LANDING_MARKER_SPRITE, puddleSprite } from '../../art/food/FoodSpriteArt';
import { LayerRenderer } from './LayerRenderer';
import { MeshPool } from './MeshPool';
import { applySpriteTexture, createShadowMesh, createSpriteMesh, setOpacity } from './meshFactories';
import type { SpriteTextureCache } from './SpriteTextureCache';
import type { WorldFrame } from './worldFrame';

const PUDDLE_ART_RADIUS_X = 100;
const PUDDLE_ART_RADIUS_Y = 40;
const SHADOW_MAX_OPACITY = 0.22;

/**
 * Everything that lies on the grass, drawn below the ducks:
 * puddles, the growing shadows of falling food, decoys and Nube's landing marks.
 */
export class GroundLayer {
  private readonly layer: LayerRenderer;
  private readonly puddles: MeshPool;
  private readonly shadows: MeshPool;
  private readonly markers: MeshPool;
  private readonly decoys: MeshPool;
  private readonly duckShadows: MeshPool;

  constructor(
    canvas: HTMLCanvasElement,
    pixelRatio: number,
    antialias: boolean,
    private readonly textures: SpriteTextureCache,
  ) {
    this.layer = new LayerRenderer(canvas, pixelRatio, antialias);
    this.puddles = new MeshPool(this.layer.scene, createSpriteMesh);
    this.shadows = new MeshPool(this.layer.scene, createShadowMesh);
    this.markers = new MeshPool(this.layer.scene, createSpriteMesh);
    this.decoys = new MeshPool(this.layer.scene, createSpriteMesh);
    this.duckShadows = new MeshPool(this.layer.scene, createShadowMesh);
  }

  draw(frame: WorldFrame): void {
    this.drawPuddles(frame);
    this.drawShadows(frame);
    this.drawAirborneDuckShadows(frame);
    this.drawLandingMarkers(frame);
    this.drawDecoys(frame);
    this.layer.render();
  }

  setPixelRatio(pixelRatio: number): void {
    this.layer.setPixelRatio(pixelRatio);
  }

  dispose(): void {
    [this.puddles, this.shadows, this.markers, this.decoys, this.duckShadows].forEach((pool) => pool.dispose());
    this.layer.dispose();
  }

  private drawPuddles(frame: WorldFrame): void {
    this.puddles.beginFrame();
    for (const puddle of frame.puddles) {
      const mesh = this.puddles.acquire(puddle.id);
      const texture = this.textures.get(puddle.isCold ? 'puddle-cold' : 'puddle', puddleSprite(puddle.isCold));
      if (!applySpriteTexture(mesh, texture)) continue;
      mesh.scale.x *= puddle.radiusX / PUDDLE_ART_RADIUS_X;
      mesh.scale.y *= puddle.radiusY / PUDDLE_ART_RADIUS_Y;
      mesh.position.set(puddle.x, puddle.y, 0);
      mesh.renderOrder = 0;
    }
    this.puddles.endFrame();
  }

  private drawShadows(frame: WorldFrame): void {
    this.shadows.beginFrame();
    for (const food of frame.foods) {
      const mesh = this.shadows.acquire(food.id);
      const radiusX = FOOD_SPRITES[food.kind].width * 0.42;
      const growth = 0.2 + 0.8 * food.fallProgress;
      mesh.scale.set(radiusX * growth, radiusX * 0.3 * growth, 1);
      mesh.position.set(food.x, food.y, 0);
      setOpacity(mesh, SHADOW_MAX_OPACITY * (0.2 + 0.8 * food.fallProgress));
      mesh.renderOrder = 1;
    }
    this.shadows.endFrame();
  }

  private drawAirborneDuckShadows(frame: WorldFrame): void {
    this.duckShadows.beginFrame();
    for (const duck of frame.airborneDucks) {
      const mesh = this.duckShadows.acquire(duck.id);
      const shrink = Math.max(0.55, 1 - duck.height / 250);
      mesh.scale.set(46 * duck.scale * shrink, 10 * duck.scale * shrink, 1);
      mesh.position.set(duck.x, duck.y, 0);
      setOpacity(mesh, 0.16);
      mesh.renderOrder = 1;
    }
    this.duckShadows.endFrame();
  }

  private drawLandingMarkers(frame: WorldFrame): void {
    this.markers.beginFrame();
    frame.landingMarkers.forEach((marker, index) => {
      const mesh = this.markers.acquire(`marker-${index}`);
      if (!applySpriteTexture(mesh, this.textures.get('landing-marker', LANDING_MARKER_SPRITE))) return;
      const pulse = 1 + 0.06 * Math.sin(frame.timeMs / 160 + index);
      mesh.scale.x *= pulse;
      mesh.scale.y *= pulse;
      mesh.position.set(marker.x, marker.y, 0);
      setOpacity(mesh, marker.opacity);
      mesh.renderOrder = 2;
    });
    this.markers.endFrame();
  }

  private drawDecoys(frame: WorldFrame): void {
    this.decoys.beginFrame();
    for (const decoy of frame.decoys) {
      const mesh = this.decoys.acquire(decoy.id);
      if (!applySpriteTexture(mesh, this.textures.get('food-bread', FOOD_SPRITES.bread), 0.9)) continue;
      const wobble = Math.sin(frame.timeMs / 120) * 0.08;
      mesh.rotation.z = wobble;
      mesh.position.set(decoy.x, decoy.y - 22, 0);
      mesh.renderOrder = 3;
    }
    this.decoys.endFrame();
  }
}
