import { SceneCallbacks } from "../scene/SceneCallbacks";
/**
 * Loads model`s metadata (properties) from buckets and provides functions to manage elements properties.
 */
export declare class MetaManager extends EventTarget {
    /**Loaded model GUIDs.*/
    modelIds: Set<string>;
    /**Tree with metadata nodes structure. */
    metaTree: any[];
    /**Map for mapping elements GUIDs to numbers. */
    guidToNums: Map<string, number>;
    /**Map for mapping elements numbers to GUIDs. */
    numsToGuids: Map<number, string>;
    private readonly server;
    private loadProgressShow;
    private loadProgress;
    private loadedCallback;
    private allLoadedCallback;
    /**
     *
     * @param server - Tangl server url.
     */
    constructor(server?: string);
    /**
     * Set callback function for event when each model will be loaded.
     * @group Callbacks
     * @param loadedCallback - function with LoadedCallbackFunction signature.
     */
    onLoaded(loadedCallback: SceneCallbacks.LoadedCallbackFunction): MetaManager;
    /**
     * Set callback function for event when all models will be loaded.
     * @group Callbacks
     * @param allLoadedCallback - function with plain Function signature.
     */
    onAllLoaded(allLoadedCallback: Function): MetaManager;
    /**
     * Load metadata.
     * @param ids - Model GUID or model GUIDs string with comma separator or GUIDs array.
     */
    load(ids: {
        id: any;
        name: string;
    }[]): void;
    /**
     * Get element GUID by element geometry number and local number.
     * @param elNum
     */
    getElementGuid(elNum: number): string | undefined;
    /**
     * Get element numbers by GUID.
     * @param guid - element GUID.
     */
    getElementNums(guid: string): number | undefined;
    /**
     * Get full metadata for specified elements.
     * @param guids - Elements GUIDs.
     */
    getElementsMetasByGuids(guids: string[]): Promise<any[]>;
    private collectDataRefs;
    private getRefMetas;
    /**
     * Get element metadata by element numbers.
     * @param elNum - Element number.
     */
    getElementMetaByNumbers(elNum: number): Promise<any>;
    /**
     * Get element metadata by GUID.
     * @param guid - element GUID.
     */
    getElementMetaByGuid(guid: string): Promise<any>;
    /**
     * Traverse all nodes in meta tree and search element node with given geometry number and element number.
     * If geometry or element number undefined then traverse will scan and call callback function for every element node.
     * @param onNodeCallback - Callback function for founded node.
     * @param elNum - Element number.
     */
    traverse(onNodeCallback: Function, elNum?: number): void;
    private traverseNodes;
    /**
     * Collect all element nodes for any parent node in meta tree.
     * @param node - Any parent node.
     */
    collectEndNodes(node: any): any[];
    /**
     * Destroy MetaManager and delete all data from browser store.
     */
    destroy(): void;
}
