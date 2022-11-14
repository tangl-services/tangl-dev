import { Vector3 } from "three";
export declare class Label {
    mode: Number;
    labelX: Number;
    labelY: Number;
    posX: any;
    posY: any;
    posZ: any;
    updateLabelPos(el: any, camera: any, snap: Vector3): void;
    updateMode(): void;
    constructor();
}
