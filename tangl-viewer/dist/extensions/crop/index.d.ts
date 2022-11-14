import { ExtensionBase } from '../ExtensionBase';
import { Vector3, WebGLRenderer, PerspectiveCamera, Mesh, Plane, ShaderMaterial } from 'three';
import { DragControls } from "three/examples/jsm/controls/DragControls.js";
declare enum GizmoDir {
    X = "crop-x",
    NX = "crop-nx",
    Y = "crop-y",
    NY = "crop-ny",
    Z = "crop-z",
    NZ = "crop-nz"
}
/**
 * Crop box extension. Extension can show crop box and creates gizmos for modifying box size.
 */
export declare class CropExtension extends ExtensionBase {
    static getName: () => string;
    isCropOn: boolean;
    gizmos: {
        [id: string]: Mesh;
    };
    planes: Map<GizmoDir, Plane>;
    renderer: WebGLRenderer;
    camera: PerspectiveCamera;
    gizmoMat: ShaderMaterial;
    dControl: DragControls;
    startPosition: Vector3;
    private isNoData;
    constructor(viewerName: string);
    added(): void;
    deleted(): void;
    onSceneLoaded(): void;
    private init;
    private setupGizmos;
    private addGizmo;
    onMouseMove(): void;
    private hideFacesOutside;
    onMouseWheel(event: MouseEvent): void;
    private updateCropBox;
    /**
     * Set crop box to selected elements boundaries.
     */
    setCropToSelected(): void;
    /**
     * Switch on or off crop box.
     * @param on - Is crob box on.
     */
    setCrop(on: boolean): void;
}
export {};
