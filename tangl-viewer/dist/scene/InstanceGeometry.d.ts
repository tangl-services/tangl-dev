import * as THREE from "three";
import { Box3, Color, Material, Vector3 } from "three";
import { GeometryBase } from "./GeometryBase";
import { Instance } from "./Instance";
export declare class InstanceGeometry extends GeometryBase {
    origin: Vector3;
    type: string;
    box: Box3;
    opacity: number;
    color: Color;
    matName: string;
    constructor(geomFileNumber: number);
    processGeometry(child: THREE.Mesh | THREE.LineSegments, materials: Material[]): void;
    instances: Array<Instance>;
}
