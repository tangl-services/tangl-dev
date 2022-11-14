/**
 * Event for models loading progress.
 */
export declare class ModelsProgressEvent extends Event {
    /** Loading progress in percents. */
    readonly progress: number;
    /**
     *
     * @param progress - Loading progress in percents.
     */
    constructor(progress: number);
}
/**
 * Event for elements selection.
 */
export declare class ElementsSelectedEvent extends Event {
    readonly elNums: number[];
    readonly forceAdd: boolean;
    constructor(elNums?: number[], forceAdd?: boolean);
}
/**
 * SceneManager events collection. Events raised by {@link SceneManager}.
 */
export declare enum SceneEvents {
    /**
     * Raised when scene loading progress changes. Event with {@link ModelsProgressEvent} signature.
     */
    Progress = "progress",
    /**
     * Raised when all models loaded by SceneManager.
     */
    AllLoaded = "allloaded",
    /**
     * Raised when current elements selection changes.
     */
    Selected = "selected"
}
