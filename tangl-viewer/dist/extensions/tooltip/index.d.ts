import { ExtensionBase } from '../ExtensionBase';
import { Vector2 } from 'three';
import { MoveEvent } from "../../three/RenderEvents";
/**
 * Tooltip common extension. Used for showing tooltip near mouse pointer with custom content.
 * Other extensions can use this extension for showing content inside.
 */
export declare class TooltipExtension extends ExtensionBase {
    static getName: () => string;
    state: {
        isShow: boolean;
    };
    content: any;
    isVisible: boolean;
    mouse: Vector2;
    ownerExt: ExtensionBase;
    private renderMan;
    constructor(viewerName: string);
    static getTooltipName(): string;
    added(): void;
    deleted(): void;
    onMouseMove(event: MoveEvent): void;
}
