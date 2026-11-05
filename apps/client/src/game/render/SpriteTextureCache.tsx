import { renderToStaticMarkup } from 'react-dom/server';
import { CanvasTexture, LinearFilter, SRGBColorSpace, type Texture } from 'three';
import { SpriteSvg, type SpriteArt } from '../../art/food/FoodSpriteArt';

export interface SpriteTexture {
  texture: Texture;
  width: number;
  height: number;
}

/** Draws the design's SVG artwork once into a texture Three.js can use. */
async function rasterize(art: SpriteArt, resolution: number): Promise<SpriteTexture> {
  const [, , viewWidth = 1, viewHeight = 1] = art.viewBox.split(' ').map(Number);
  const width = art.width;
  const height = (art.width * viewHeight) / viewWidth;
  const markup = renderToStaticMarkup(<SpriteSvg art={art} width={width * resolution} />);
  const url = URL.createObjectURL(new Blob([markup], { type: 'image/svg+xml' }));

  try {
    const image = new Image();
    image.decoding = 'async';
    image.src = url;
    await image.decode();

    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(width * resolution);
    canvas.height = Math.ceil(height * resolution);
    canvas.getContext('2d')?.drawImage(image, 0, 0, canvas.width, canvas.height);

    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    texture.minFilter = LinearFilter;
    texture.generateMipmaps = false;
    return { texture, width, height };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export class SpriteTextureCache {
  private readonly ready = new Map<string, SpriteTexture>();
  private readonly loading = new Set<string>();

  constructor(private readonly resolution: number) {}

  /** Returns the texture if it is ready; otherwise starts loading it and returns undefined. */
  get(key: string, art: SpriteArt): SpriteTexture | undefined {
    const texture = this.ready.get(key);
    if (texture || this.loading.has(key)) return texture;

    this.loading.add(key);
    void rasterize(art, this.resolution)
      .then((loaded) => this.ready.set(key, loaded))
      .finally(() => this.loading.delete(key));
    return undefined;
  }

  dispose(): void {
    this.ready.forEach(({ texture }) => texture.dispose());
    this.ready.clear();
  }
}
