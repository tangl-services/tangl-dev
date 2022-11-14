import { Box3, Sphere } from "three";
export declare class ElementData {
    isLoaded: boolean;
    bbox: Box3;
    isHidden: boolean;
    bSphere: Sphere;
    subEls: number[];
    indeces: Map<string, Array<Number>>;
}
