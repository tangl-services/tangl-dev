import { SceneManager } from "./SceneManager";
import { ElementState } from "./ElementState";
/**
 * Functions for elements management in scene.
 * See {@link SceneManager.tools} property in {@link SceneManager} class.
 */
export declare class SceneTools {
    private sceneManager;
    constructor(sceneManager: SceneManager);
    /**
     * Set new color for elements list.
     * @param elNums - Numbers for elements list.
     * @param color -  - New color for elements list.
     * @param attrArrays
     */
    setElementsColor(elNums: number[], color: string | number, attrArrays?: any[] | undefined): void;
    /**
     * Set {@link ElementState} for elements list.
     * @param elNums - Numbers for elements list.
     * @param state -  - New state for elements list.
     * @param attrArrays
     */
    setElementsState(elNums: number[], state?: ElementState, attrArrays?: any[] | undefined): void;
    /**
     * Optimize elements visibility for reducing draw calls.
     */
    optimizeAllElementsVisibility(): void;
    /**
     * Hide elements list in scene.
     * @param elNums - Numbers for elements list.
     */
    hideElements(elNums: number[]): void;
    /**
     * Isolate elements list in scene.
     * @param elNums - Numbers for elements list.
     */
    isolateElements(elNums: number[]): void;
    private hideAllElements;
    /**
     * Show all elements in scene.
     */
    showAllElements(): void;
}
