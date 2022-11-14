import { BufferGeometry, InstancedMesh } from "three";
import { SceneManager } from "./SceneManager";
export declare class MeshTools {
    private sceneManager;
    constructor(sceneManager: SceneManager);
    optimizeInstancesVisibility(mesh: InstancedMesh): void;
    optimizeSharedVisibility(g: BufferGeometry, isLine: boolean): void;
}
