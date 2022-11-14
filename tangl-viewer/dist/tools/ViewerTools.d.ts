import { BufferGeometry } from "three";
export declare function setStyleAttribute(element: HTMLElement, attrs: {
    [key: string]: Object;
}): void;
export declare function packColor(color: number[] | Uint8Array): number;
export declare function remapRange(num: number, inMin: number, inMax: number, outMin: number, outMax: number): number;
export declare function computeBoundsTree(g: BufferGeometry): void;
