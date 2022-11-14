import { ExtensionBase } from "./ExtensionBase";
import { ControllerExtensionBase } from "./ControllerExtensionBase";
import { ModeExtensionBase } from "./ModeExtensionBase";
/**
 * Extensions store for single render manager
 */
export declare class ExtensionsManager {
    private extensions;
    /**Current selected mode extension name. */
    selectedModeExtName: string;
    /**Current selected controller extension name. */
    selectedControllerExtName: string;
    viewerName: string;
    /**
     * Add additional extension to extensions list.
     * @param extensionType - Extension type. Should be nested from {@link ExtensionBase}.
     * @param args - Optional arguments. Will be passed into extension constructor as second parameter.
     * @returns Created extension instance.
     */
    addExtension(extensionType: {
        new (viewerName: string, args: any | undefined): ExtensionBase;
    }, args?: any | undefined): ExtensionBase;
    /**
     * Clear extensions list.
     */
    clear(): void;
    /**
     * Get extension by name.
     * @param name - Extension name.
     * @returns Extension if found or undefined if extension not found.
     */
    getExtensionByName(name: string): ExtensionBase | undefined;
    /**
     * Get all extensions list.
     */
    getExtensions(): ExtensionBase[];
    /**
     * Get current selected mode extension.
     */
    selectedModeExtension(): ModeExtensionBase;
    /**
     * Select active mode extension.
     * @param name - Name of extension for activation.
     */
    selectModeExtension(name: string): void;
    /**
     * Get all mode extensions in ExtansionManager.
     */
    getModeExtensions(): ModeExtensionBase[];
    /**
     * Get current selected controller extension.
     */
    selectedControllerExtension(): ControllerExtensionBase;
    /**
     * Get all controller extensions in ExtansionManager.
     */
    getControllerExtensions(): ControllerExtensionBase[];
    /**
     * Select active controller extension.
     * @param name - Name of extension for activation.
     */
    selectControllerExtension(name: string): void;
}
