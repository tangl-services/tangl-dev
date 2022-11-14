import { ExtensionBase } from '../ExtensionBase';
import { Label } from "./Label";
import { WebGLRenderer, PerspectiveCamera, Vector3, Mesh } from 'three';
export declare class CoordinatesExtension extends ExtensionBase {
    static getName: () => string;
    content: any;
    isVisible: boolean;
    isActive: any;
    isLabelsShow: boolean;
    isBlockControls: boolean;
    renderer: WebGLRenderer;
    camera: PerspectiveCamera;
    rayPoint: Vector3;
    rayFaceNormal: Vector3;
    helperSnap: THREE.Mesh;
    label: Label;
    snapPoint: Vector3;
    onSceneLoaded(): Promise<void>;
    switchCoordinatesMode(): void;
    onMouseMove(): void;
    findClosestVertex(object: Mesh, position: Vector3, radius: number): Vector3 | null;
    updateHelperPos(): void;
    updateHelperScale(pos: any): void;
    constructor(viewerName: string);
    static getLabelName(): string;
    added(): void;
    deleted(): void;
}
