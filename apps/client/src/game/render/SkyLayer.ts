import { FOOD_SPRITES, RAIN_CLOUD_SPRITE } from '../../art/food/FoodSpriteArt';
import { LayerRenderer } from './LayerRenderer';
import { MeshPool } from './MeshPool';
import { applySpriteTexture, createSpriteMesh } from './meshFactories';
import type { SpriteTextureCache } from './SpriteTextureCache';
import { CLOUD_ALTITUDE, type WorldFrame } from './worldFrame';

/** Everything in the air, drawn above the ducks: falling food and rain clouds. */
export class SkyLayer {
  private readonly layer: LayerRenderer;
  private readonly foods: MeshPool;
  private readonly clouds: MeshPool;

  constructor(
    canvas: HTMLCanvasElement,
    pixelRatio: number,
    antialias: boolean,
    private readonly textures: SpriteTextureCache,
  ) {
    this.layer = new LayerRenderer(canvas, pixelRatio, antialias);
    this.foods = new MeshPool(this.layer.scene, createSpriteMesh);
    this.clouds = new MeshPool(this.layer.scene, createSpriteMesh);
  }

  draw(frame: WorldFrame): void {
    this.drawFoods(frame);
    this.drawClouds(frame);
    this.layer.render();
  }

  setPixelRatio(pixelRatio: number): void {
    this.layer.setPixelRatio(pixelRatio);
  }

  dispose(): void {
    this.foods.dispose();
    this.clouds.dispose();
    this.layer.dispose();
  }

  private drawFoods(frame: WorldFrame): void {
    this.foods.beginFrame();
    for (const food of frame.foods) {
      const mesh = this.foods.acquire(food.id);
      const sprite = this.textures.get(`food-${food.kind}`, FOOD_SPRITES[food.kind]);
      if (!applySpriteTexture(mesh, sprite)) continue;
      // The food's bottom touches the grass when height is 0.
      mesh.position.set(food.x, food.y - food.height - sprite!.height / 2, 0);
      mesh.rotation.z = food.height > 0 ? Math.sin((frame.timeMs + food.x) / 260) * 0.12 : 0;
      mesh.renderOrder = Math.round(food.y);
    }
    this.foods.endFrame();
  }

  private drawClouds(frame: WorldFrame): void {
    this.clouds.beginFrame();
    for (const cloud of frame.clouds) {
      const mesh = this.clouds.acquire(cloud.id);
      if (!applySpriteTexture(mesh, this.textures.get('rain-cloud', RAIN_CLOUD_SPRITE))) continue;
      const bob = Math.sin((frame.timeMs + cloud.x * 7) / 500) * 4;
      mesh.position.set(cloud.x, cloud.y - CLOUD_ALTITUDE + bob, 0);
      mesh.renderOrder = 10_000;
    }
    this.clouds.endFrame();
  }
}
