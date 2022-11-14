import { ExtensionBase } from './ExtensionBase';
import { PerspectiveCamera, Vector3 } from "three";
import { RenderManager } from "../three/RenderManager";
/**
 * Base class for any controller extension for render manager.
 * Controller extensions can manage renderer camera and provide way for user actions.
 * For example, rotating, zoom, walkthrouts, panoramic moving and so on.
 */
export declare abstract class ControllerExtensionBase extends ExtensionBase {
    /**Extension type (ext, mode, control)*/
    readonly type: string;
    /**Controller description or name.*/
    readonly controllerDesc: string;
    /**Controller icon name. Icon name will be used by viewer Toolbar UI component for displaying mode buttons.*/
    readonly controllerIcon: string;
    /**Is controller blocked by viewer */
    isEnabled: boolean;
    /** Target point for viewer camera. Need for various transformation actions like orbit.  */
    target: Vector3;
    protected domElement: any;
    protected camera: PerspectiveCamera;
    protected renderMan: RenderManager;
    /**
     * @param viewerName - Owner viewer name.
     * @param controllerDesc - Mode description or name. Also you can use locale key.
     * @param controllerIcon - Controller icon name. Icon name will be used by viewer Toolbar UI component for displaying controllers dropdown menu.
     * @protected
     */
    protected constructor(viewerName: string, controllerDesc: string, controllerIcon: string);
    /** Get camera target point clone. */
    abstract getTargetClone(): Vector3;
    /**Hook when extension is activated (selected as current controller).
     * Called by ExtensionManager.selectControllerExtension().
     * @group Hooks
     */
    abstract selected(): void;
    /**Hook when extension is deactivated.
     * Called by ExtensionManager.selectControllerExtension()
     * @group Hooks
     */
    abstract unselected(): void;
    /**
     * Hook when controller extension needs updating and transforming camera for next renderer frame.
     * Called by ThreeManager.animate().
     * @group Hooks
     * @param delta - Time delta between last frame and new frame.
     */
    abstract updated(delta: number): void;
}
