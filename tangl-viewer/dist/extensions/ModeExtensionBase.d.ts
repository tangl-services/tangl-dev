import { ExtensionBase } from './ExtensionBase';
/**
 * Base class for any mode extension for render manager.
 * Mode extensions can store and restore scene state. In other words define additional mode for viewer for scene representation.
 * For example, mode extension can colorize any elements in scene and store this scene state.
 */
export declare abstract class ModeExtensionBase extends ExtensionBase {
    /**Extension type (ext, mode, control).*/
    readonly type: string;
    /**Mode description or name.*/
    readonly modeDesc: string;
    /**Mode icon name. Icon name will be used by viewer Toolbar UI component for displaying mode buttons.*/
    readonly modeIcon: string;
    protected colorArray: [];
    protected stateArray: Float32Array[];
    protected resArray: any[];
    protected els: number[];
    protected res: Array<Array<any>>;
    protected details: any | undefined;
    /**
     * Set data to resource array and details array for elements list.
     * @param geomNums - Elements geometry Ids.
     * @param elNums - Elements self Ids.
     * @param resourceArray - Resource data array.
     * @param details -Details data array.
     */
    setData(elNums: number[], resourceArray: any[], details: any | undefined): void;
    /**
     * @param viewerName - Owner viewer name.
     * @param modeDesc - Mode description or name.
     * @param modeIcon - Mode icon name. Icon name will be used by viewer Toolbar UI component for displaying mode buttons.
     * @protected
     */
    protected constructor(viewerName: string, modeDesc: string, modeIcon: string);
    /**
     * Setup viewer state and modify elements by this state.
     * Must be overriden by each mode extension.
     */
    abstract setup(): void;
    /**Hook when extension is activated (selected as current mode).
     * Called by ExtensionManager.selectControllerExtension().
     * @group Hooks
     */
    abstract selected(): void;
    /**Hook when extension is deactivated.
     * Called by ExtensionManager.selectControllerExtension()
     * @group Hooks
     */
    abstract unselected(): void;
}
