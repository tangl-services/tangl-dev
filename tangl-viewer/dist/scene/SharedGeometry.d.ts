import * as THREE from "three";
import { Color, MeshStandardMaterial, Vector3 } from "three";
import { GeometryBase } from "./GeometryBase";
export declare class SharedGeometry extends GeometryBase {
    origin: Vector3;
    nOrigin: Vector3;
    type: string;
    geomFileTotal: number;
    opacity: number;
    color: Color;
    matName: string;
    instances: string[];
    transparent: boolean;
    constructor(material: MeshStandardMaterial, child: any, geomFileNumber: number, geomFileTotal: number, origin: Vector3);
    processSharedGeometry(child: THREE.Mesh | THREE.LineSegments, geomFileNumber: number, geomFileTotal: number): void;
}
