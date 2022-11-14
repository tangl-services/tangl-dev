import { BufferGeometry, InstancedMesh, Matrix4 } from "three";
/**
 * Function signatures for using with SceneManager callbacks.
 */
export declare namespace SceneCallbacks {
    /**
     * Callback function for models load progress event.
     * @param progress - progress of loaded models in percent.
     */
    type ProgressCallbackFunction = (progress: number) => void;
    /**
     * Callback function for load model event.
     * @param modelId - GUID for loaded model.
     */
    type LoadedCallbackFunction = (modelId: string) => void;
    /**
     * Callback function for oe index for buffer traversing iteration.
     * @param geometry - Current BufferGeometry instance.
     * @param geomNum - Current element geometry number.
     * @param elNum - Current element number.
     * @param idx - Current buffer index in BufferGeometry instance.
     */
    type TraverseCallbackFunction = (geometry: BufferGeometry, elNum: number, idx: number) => void;
    type EndTraverseMeshCallbackFunction = (geometry: BufferGeometry, isMesh: boolean) => void;
    type StartTraverseMeshCallbackFunction = (geometry: BufferGeometry, meshIdx: number, isMesh: boolean) => void;
    type TraverseInstanceMeshCallbackFunction = (child: InstancedMesh, meshIdx: number, elNum: number, matrix: Matrix4, idx: number) => void;
    type TraverseInstanceMeshEndCallbackFunction = (child: InstancedMesh, meshIdx: number) => void;
}
