import { Box3, BufferGeometry, Group, InstancedMesh, Material, Matrix4, Object3D, Scene, Vector3 } from 'three';
import { SceneCallbacks } from "./SceneCallbacks";
import { SceneTools } from "./SceneTools";
import { MeshTools } from "./MeshTools";
import { ClippingTools } from "../three/ClippingTools";
import { ElementData } from "./ElementData";
import { SharedGeometry } from "./SharedGeometry";
import { InstanceGeometry } from "./InstanceGeometry";
/**
 * Loads models (geometric data) from buckets and provides functions to manage elements from these models (selection, traversing and so on).
 * @example
 * const sceneManager = new SceneManager()
 *    .onProgress((progress:number)=>{
 *		   console.log('Loading progress: '+ progress +'%')
 *    })
 *    .onLoaded((modelId: string)=>{
 *		   console.log('Model: '+ modelId +' is loaded')
 *    })
 *    .onAllLoaded(()=>{
 *		   console.log('All models are loaded')
 *    })
 *    .load("93649f36-9b57-c3e6-1583-39fdcfcabda5")
 */
export declare class SceneManager extends EventTarget {
    /**Tools class for elements management. */
    tools: SceneTools;
    /**Tools class for operations with clipping planes. */
    clippingTools: ClippingTools;
    /**Tools class for operations with meshes. */
    meshTools: MeshTools;
    /**Main scene for general geometry objects.*/
    scene: Scene;
    /**Loaded model GUIDs.*/
    modelIds: Set<string>;
    /**General (not transparent) meshes scene group.*/
    private group;
    /**Line meshes scene group.*/
    groupLines: Group;
    /**Fantom meshes scene group.*/
    groupFantoms: Group;
    /**Transparent meshes scene group.*/
    groupTrans: Group;
    /**Materials catalog for loaded models.*/
    materials: Map<string, Material>;
    /**Map for original indices of all geometry objects. Used to restore elements visibility. */
    originalIndices: Map<string, ArrayLike<number>>;
    /**Map for original matrices for instance objects. Could be used to restore elements visibility. */
    originalMatrices: Map<string, Matrix4[]>;
    /**Additional elements data like bounding box.*/
    elementDatas: Map<number, ElementData>;
    /**Scene temporary bounding box.*/
    selBox: Box3;
    /**Scene bounding box.*/
    sceneBox: Box3;
    /**Is progressive render mode on.*/
    isProgressive: boolean;
    /**Geometry numbers for selected elements.*/
    selElNums: number[];
    /**Is navigation process has been started by active controller extension. */
    isNavigationStarted: boolean;
    /** Load progress when models are loading. */
    loadProgress: number;
    /** Are models loading. */
    loadProgressShow: boolean;
    /** Inner scene origin. */
    private origin;
    /** Is any geometry data loaded. */
    isNoData: boolean;
    /**Total elements hided by degradation system in navigation process. */
    totalDegradedChilds: number;
    private globalOrigin;
    private clock;
    private deltaMed;
    private maxDegradeSharedLength;
    private maxDegradeInstancesLength;
    private readonly server;
    private progressCallback;
    private loadedCallback;
    private allLoadedCallback;
    /**
     *
     * @param server - Tangl server url.
     */
    constructor(server?: string);
    private initLights;
    /**
     * Get scene global origin coordinates.
     */
    getGlobalOrigin(): Vector3;
    /**
     * Get all children elements and meshes from all scenes.
     * @param getMainChildren - should function add children from main scene (opacity meshes).
     * @param getTransparentChildren - should function add children from transparent scene (transparent meshes).
     * @param getLineChildren - should function add children from line scene (lines).
     */
    getSceneChldren(getMainChildren?: boolean, getTransparentChildren?: boolean, getLineChildren?: boolean): Array<Object3D>;
    /**
     * Set callback function for model loading progress event.
     * @group Callbacks
     * @param progressCallback - function with ProgressCallbackFunction signature.
     */
    onProgress(progressCallback: SceneCallbacks.ProgressCallbackFunction): SceneManager;
    /**
     * Set callback function for event when each model will be loaded.
     * @group Callbacks
     * @param loadedCallback - function with LoadedCallbackFunction signature.
     */
    onLoaded(loadedCallback: SceneCallbacks.LoadedCallbackFunction): SceneManager;
    /**
     * Set callback function for event when all models will be loaded.
     * @group Callbacks
     * @param allLoadedCallback - function with plain Function signature.
     */
    onAllLoaded(allLoadedCallback: Function): SceneManager;
    addModelData(elementDatas: Map<number, ElementData>, sharedGeoms: Map<string, SharedGeometry>, instanceGeoms: Map<string, InstanceGeometry>): void;
    /**
     * Load models into scene.
     * @param ids - Model GUID or model GUIDs string with comma separator or GUIDs array.
     */
    load(ids: string | string[]): void;
    private checkAllLoaded;
    private postGeometryLoaded;
    degradeScene(): void;
    undegradeScene(): void;
    /**
     * Select one or many elements in scene.
     * @param elNums - Elements numbers for selection.
     * @param forceAdd - Add new selection to current or replace.
     * @param forceEvent - Force SceneEvents.Selected event dispatching.
     */
    updateSelection(elNums?: number[], forceAdd?: boolean, forceEvent?: boolean): void;
    /**
     * Scan and gather scene geometry buffers and return buffer data only for elements list.
     * Used for changing buffers data for particular elements in model.
     * @param elNums - Elements numbers for for gathering.
     * @param elVals - Elements values for gathering.
     * @param callback
     * @param endCallback
     * @param startCallback
     * @param instanceCallback
     * @param startInstanceCallback
     * @param instanceMeshEndCallback
     */
    traverseElementsWithValues(elNums: number[], elVals: any[] | any, callback: (geometry: BufferGeometry, elNum: number, idx: number, val: any) => void, endCallback: SceneCallbacks.EndTraverseMeshCallbackFunction, startCallback: SceneCallbacks.StartTraverseMeshCallbackFunction, instanceCallback: (child: InstancedMesh, meshIdx: number, elNum: number, matrix: Matrix4, idx: number, val: any) => void, startInstanceCallback?: Function, instanceMeshEndCallback?: SceneCallbacks.TraverseInstanceMeshEndCallbackFunction): void;
    traverseElements2(elNums: number[], callback: SceneCallbacks.TraverseCallbackFunction, endMeshCallback: SceneCallbacks.EndTraverseMeshCallbackFunction, startMeshCallback: SceneCallbacks.StartTraverseMeshCallbackFunction, instanceMeshCallback: SceneCallbacks.TraverseInstanceMeshCallbackFunction, instanceMeshEndCallback?: SceneCallbacks.TraverseInstanceMeshEndCallbackFunction): void;
    traverseAllElements(callback: SceneCallbacks.TraverseCallbackFunction, endMeshCallback: SceneCallbacks.EndTraverseMeshCallbackFunction, startMeshCallback: SceneCallbacks.StartTraverseMeshCallbackFunction, instanceMeshCallback: SceneCallbacks.TraverseInstanceMeshCallbackFunction): void;
}
