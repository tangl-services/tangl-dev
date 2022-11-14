import { Box3 } from "three";
export declare class GeometryBase {
    static getGeomElNumber(geomNumber: number, elNumber: number): number;
    static getGeomNumber(geomElNumber: number): number;
    verts: Float32Array;
    elNums: Float32Array;
    index: Uint32Array;
    geomFileNumber: number;
    box: Box3;
}
