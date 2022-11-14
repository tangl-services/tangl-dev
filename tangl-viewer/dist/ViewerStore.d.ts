import { RenderManager } from "./three/RenderManager";
import { SceneManager } from "./scene/SceneManager";
import { MetaManager } from "./meta/MetaManager";
/**
 * Store for active RenderManagers. Each RenderManager have unique name.
 * @example
 * const sceneManager = new SceneManager();
 * const renderManager = viewerStore.createRenderManager("default", sceneManager);
 */
export declare class ViewerStore {
    /**Active RenderManager instances*/
    readonly renderMans: Map<string, RenderManager>;
    /**
     * Create new RenderManager instance and store it in map
     * @param name - unique name of RenderManager
     * @param sceneManager - SceneManager instance for adding into new RenderManager
     * @param metaManager - Optional MetaManager. Used for possible additional operations with metadata.
     * @returns New RenderManager instance or existing instance if manager with this name already exists
     */
    createRenderManager(name: string, sceneManager: SceneManager, metaManager?: MetaManager | undefined): RenderManager;
    /**
     * Add existing RenderManager into map
     * @param name - unique name of RenderManager
     * @param threeMan - RenderManager instance for adding to map
     */
    addRenderManager(name: string, threeMan: RenderManager): void;
    /**
     * Get RenderManager by name
     * @param name - name of RenderManager
     */
    getRenderManager(name?: string): RenderManager | undefined;
}
