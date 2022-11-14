import { ModeExtensionBase } from '../ModeExtensionBase';
import { TooltipExtension } from "../tooltip";
import { RenderManagerState } from "../../three/RenderManagerState";
/**
 * General mode extension. Used for common model view state. Does not have any specific options.
 */
export declare class GeneralModeExtension extends ModeExtensionBase {
    static getName: () => string;
    tooltipExt?: TooltipExtension;
    state: RenderManagerState;
    /**
     * @param viewerName - Owner viewer name.
     */
    constructor(viewerName: string);
    onSceneLoaded(): void;
    added(): void;
    deleted(): void;
    /**Hook for extension activation (selected as current mode).
     * Called by ExtensionManager.selectControllerExtension().
     * @group Hooks
     */
    selected(): void;
    /**Hook for extension deactivation.
     * Called by ExtensionManager.selectControllerExtension()
     * @group Hooks
     */
    unselected(): void;
    /**
     * Setup viewer state and modify elements by this state.
     * Must be overriden by each mode extension.
     */
    setup(): void;
}
