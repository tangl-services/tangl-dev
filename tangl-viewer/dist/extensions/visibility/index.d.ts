import { ExtensionBase } from '../ExtensionBase';
/**
 * Extension for manage elements visibility.
 * Extension can hide, isolate selected elements and show all elements in scene.
 */
export declare class VisibilityExtension extends ExtensionBase {
    static getName: () => string;
    private isNoData;
    constructor(viewerName: string);
    added(): void;
    deleted(): void;
    onSceneLoaded(): void;
    /**
     * Hide selected elements in scene.
     */
    hideSelected(): void;
    /**
     * Show all elements in scene.
     */
    showAll(): void;
    /**
     * Isolate selected elements in scene.
     */
    isolateSelected(): void;
}
