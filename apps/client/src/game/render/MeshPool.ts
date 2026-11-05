import type { Mesh, Scene } from 'three';

/**
 * Object pooling (from the tech doc): fruits, shadows and puddles come and go
 * all the time, so their meshes are reused instead of created and destroyed.
 */
export class MeshPool {
  private readonly active = new Map<string, Mesh>();
  private readonly free: Mesh[] = [];
  private touched = new Set<string>();

  constructor(
    private readonly scene: Scene,
    private readonly createMesh: () => Mesh,
  ) {}

  /** Call once per frame before acquiring. */
  beginFrame(): void {
    this.touched = new Set<string>();
  }

  acquire(id: string): Mesh {
    this.touched.add(id);
    let mesh = this.active.get(id);
    if (!mesh) {
      mesh = this.free.pop() ?? this.addToScene(this.createMesh());
      this.active.set(id, mesh);
    }
    mesh.visible = true;
    return mesh;
  }

  /** Hides and recycles every mesh that was not acquired this frame. */
  endFrame(): void {
    for (const [id, mesh] of this.active) {
      if (this.touched.has(id)) continue;
      mesh.visible = false;
      this.active.delete(id);
      this.free.push(mesh);
    }
  }

  dispose(): void {
    for (const mesh of [...this.active.values(), ...this.free]) {
      mesh.geometry.dispose();
      const material = mesh.material;
      (Array.isArray(material) ? material : [material]).forEach((item) => item.dispose());
    }
    this.active.clear();
    this.free.length = 0;
  }

  private addToScene(mesh: Mesh): Mesh {
    this.scene.add(mesh);
    return mesh;
  }
}
