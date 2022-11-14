import { Box3, InstancedMesh, MeshBasicMaterial, PerspectiveCamera, Plane, Scene, WebGLRenderer } from "three";
import { SceneManager } from "../scene/SceneManager";
import { ElementData } from "../scene/ElementData";
export declare class ClippingTools {
    capsColor: string;
    private sceneManager;
    private planes;
    private planeSize;
    scene: Scene;
    private planesGroup;
    backMat: MeshBasicMaterial;
    frontMat: MeshBasicMaterial;
    constructor(sceneManager: SceneManager);
    private initLights;
    /**
     * Set clipping planes for scene.
     * @param planes - array of clipping planes.
     * @param isReplace - Replace current planes set or only add/modify.
     */
    setPlanes(planes: Map<string, Plane>, isReplace?: boolean): void;
    private updateMaterials;
    deletePlanes(names: string[]): void;
    getPlanes(): Array<Plane>;
    getActivePlanes(): Array<Plane>;
    updatePlanes(bbox: Box3): void;
    isInstanceMeshVisible(mesh: InstancedMesh, idx: number): boolean;
    isSharedMeshVisible(elemData: ElementData): boolean;
    updatePlanesStatus(camera: PerspectiveCamera): void;
    private getPlanesExceptKey;
    render(renderer: WebGLRenderer, camera: PerspectiveCamera, generateIntersectionCaps?: boolean): void;
    updatePlaneSizes(bbox: Box3): void;
}
