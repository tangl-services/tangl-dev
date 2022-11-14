import { RenderManager } from "../three/RenderManager";
/**
 * Base class for any extension for render manager
 */
export declare abstract class ExtensionBase {
    /**Owner viewer name. */
    readonly viewerName: string;
    /**Any extension data which can be stored in browser local storage and restored after (any extension settings, buttons state and so one).
     *State will be saved in local storage with 'tangl-ext-extensionName' key.
     */
    state: any;
    /**Extension type (ext, mode, control).*/
    readonly type: string;
    /**Get unique extension name. */
    static getName: () => string;
    /**Get unique extension name. */
    getName: () => string;
    /** Name for shared toolbar UI for extension.*/
    sharedToolbarName: string;
    /** Names list for dedicated toolbars UI for extension.*/
    dedicatedToolbarNames: string[];
    /** Additional UI component name. */
    ui: string;
    static getSharedToolbarName(): string;
    static getDedicatedToolbarName(): string;
    /**
     * @param viewerName - Owner viewer name.
     * @protected
     */
    protected constructor(viewerName: string);
    /**
     * Get current render manager.
     */
    getRenderManager(): RenderManager;
    /**
     * Save extension state in the local storage.
     */
    saveState(): void;
    /**
     * Restore extension state from the local storage.
     */
    restoreState(): void;
    /**
     * Hook when extension is added to ExtensionManager.
     * Called by ExtensionManager.addExtension().
     * @group Hooks
     */
    abstract added(): void;
    /**
     * Hook when extension is deleted from ExtensionManager.
     * Called by ExtensionManager.clear().
     * @group Hooks
     */
    abstract deleted(): void;
}
