import { OrthographicCamera, Scene, WebGLRenderer } from 'three';
import { STAGE_HEIGHT, STAGE_WIDTH } from '@pochi/shared';

/**
 * A transparent Three.js canvas the size of the design stage (1280×720).
 * The camera uses stage pixels with y growing downwards, like the SVG artwork,
 * so world coordinates and design coordinates are the same numbers.
 */
export class LayerRenderer {
  readonly scene = new Scene();
  private readonly camera = new OrthographicCamera(0, STAGE_WIDTH, 0, STAGE_HEIGHT, -100, 100);
  private readonly renderer: WebGLRenderer;

  constructor(canvas: HTMLCanvasElement, pixelRatio: number, antialias: boolean) {
    this.renderer = new WebGLRenderer({ canvas, alpha: true, antialias, powerPreference: 'low-power' });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(STAGE_WIDTH, STAGE_HEIGHT, false);
    this.camera.position.z = 10;
  }

  setPixelRatio(pixelRatio: number): void {
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(STAGE_WIDTH, STAGE_HEIGHT, false);
  }

  render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  dispose(): void {
    this.renderer.dispose();
  }
}
