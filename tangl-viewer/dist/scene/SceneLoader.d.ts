import { Vector3 } from "three";
import { SharedGeometry } from "./SharedGeometry";
import { InstanceGeometry } from "./InstanceGeometry";
import { ElementData } from "./ElementData";
export declare class SceneLoader {
    private readonly origin;
    elementDatas: Map<number, ElementData>;
    instanceGeoms: Map<string, InstanceGeometry>;
    sharedGeoms: Map<string, SharedGeometry>;
    private lzma;
    private needFixElementsData;
    private loadProgress;
    private onProgressCallback;
    constructor(lzma: {
        decompress: Function;
        terminate?: Function;
    }, origin?: Vector3);
    onProgress(onProgressCallback: Function): this;
    updateProgress(percent: number, forceSet?: boolean): void;
    processGeomData(data: any[], id: string, geomFileNumber: number): Promise<void>;
    processGeometry(data: any[], id: string, geomFileNumber: number, geomFileTotal: number, modelProgress: number, callbackResult: Function, callbackError: Function): Promise<void>;
    private mergeInstanceGeometry;
    private insertBuffers;
    fixElementsData(elementsData: Map<number, ElementData>): void;
    generateIndicesMap(sharedGeoms: Map<string, SharedGeometry>, elementDatas: Map<number, ElementData>): void;
}
