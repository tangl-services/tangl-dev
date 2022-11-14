import { Plane } from "three";
import { RenderManagerBase } from "./RenderManagerBase";
import { SceneManager } from "../scene/SceneManager";
import { MetaManager } from "../meta/MetaManager";
import { RenderManagerState } from "./RenderManagerState";
/**
 * Perform SceneManager`s scene rendering via Three.js WebGL wrapper.
 */
export declare class RenderManager extends RenderManagerBase {
    /** Is view devise is touch device. */
    isTouchDevice: boolean;
    /** Manager settings storage. */
    state: RenderManagerState;
    private needUpdate;
    private needContinuesUpdate;
    private needRender;
    private startPointerTime;
    private endPointerTime;
    private isFirstClick;
    /**
     * @param name - Name of the renderer. Must be unique.
     * @param sceneManager - SceneManager for renderer.
     * @param metaManager - Optional MetaManager. Used for possible additional operations with metadata.
     */
    constructor(name: string, sceneManager: SceneManager, metaManager?: MetaManager | undefined);
    /**
     * Init renderer for chosen DOM element id.
     * @param domElementId - DOM element id for renderer attaching.
     */
    init(domElementId: string): void;
    /** Block active controller. */
    blockControls(): void;
    /** Unblock active controller. */
    unblockControls(): void;
    protected onResize(): void;
    /** Render one frame with full processing pipeline (main pass, helper pass, state pass, mix pass). */
    private render;
    private animate;
    /**
     * Make request for new animation iteration or/and render new frame.
     * @param forceUpdateRender - is we need to render new frame.
     */
    requestUpdate(forceUpdateRender?: boolean): void;
    /**
     * Set the continuous update mode. Used for any animation that requires continuous frame refresh, such as flying.
     * @param continuesUpdate - continues update mode flag.
     */
    setContinuesUpdate(continuesUpdate: boolean): void;
    /**
     * Destroy renderer and all depending assets
     */
    destroy(): void;
    /**
     * Hook for ending controller navigation.
     * Called by current controller extension.
     * Also dispatch "navstart" viewer event
     * @group Hooks
     */
    navigationEnded(): void;
    /**
     * Hook for starting controller navigation.
     * Called by current controller extension.
     * Also dispatch "navstart" viewer event
     * @group Hooks
     */
    navigationStarted(): void;
    /**
     * Hook for changing controller navigation.
     * Called by current controller extensions "updated" hook.
     * Also dispatch "navchange" viewer event
     * @group Hooks
     */
    navigationChanged(): void;
    private initEvents;
    onMouseMove(event: MouseEvent): void;
    /**
     *Update clipping planes for renderer shaders (state shader and so on).
     * @param planes - New clipping planes.
     */
    updateClippingPlanes(planes: Array<Plane>): void;
}
