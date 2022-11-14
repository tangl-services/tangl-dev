import { Clock, PerspectiveCamera, Scene, ShaderMaterial, Vector2, WebGLRenderer } from "three";
import { ComposeShader } from "../assets/shaders/ComposeShader";
import { SceneManager } from "../scene/SceneManager";
import { ExtensionsManager } from "../extensions/ExtensionsManager";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { GTAOPass } from "../tools/threejs-sandbox/gtaoPass/src/GTAOPass.js";
import { MetaManager } from "../meta/MetaManager";
/**
 * Base class for all rendering managers.
 */
export declare abstract class RenderManagerBase extends EventTarget {
    /** Unique name of the manager. */
    readonly name: string;
    /**Scene for additional 3D graphic. Always draw above main scene without Z sorting. Can be used by extensions. */
    helpersScene: Scene;
    /** SceneManager instance for renderer. */
    sceneManager: SceneManager;
    /** MetaManager instance. */
    metaManager: MetaManager;
    /** ExtensionsManager instance for renderer. */
    readonly extMan: ExtensionsManager;
    /**Main renderer camera*/
    camera: PerspectiveCamera;
    /**DOM Element with attached viewer. */
    viewerElement: HTMLElement;
    /** Is navigation in progress. */
    isNavigation: boolean;
    /**Mouse coordinates with center origin and boundary range from -1 to 1. */
    mouse: Vector2;
    /**Mouse coordinates with screen origin and screen boundary. */
    mousePointer: Vector2;
    /**WebGLRenderer instance. */
    renderer: WebGLRenderer;
    /**Default device pixel ratio. */
    defaultPixelRatio: number;
    protected clearColor: number;
    protected isDisposed: boolean;
    protected clock: Clock;
    private pixelBuffer;
    protected startMousePointer: Vector2;
    /** Hovered element number. */
    hoveredElNum: number;
    private stateRenderTarget;
    private stateUniforms;
    /**Shader for highlighting hovered and selected elements. */
    protected stateMat: ShaderMaterial;
    private pickingRenderTarget;
    private pickingMaterial;
    private mainPass;
    protected mainComposer: EffectComposer;
    private statePass;
    protected stateComposer: EffectComposer;
    protected mixShader: ComposeShader;
    protected mixComposer: EffectComposer;
    protected gtaoPass: GTAOPass;
    protected isSelectionLocked: boolean;
    protected animBlock: number;
    protected animNumber: number;
    private progressBar;
    protected smaaPass: ShaderPass;
    /**
     * @param name - Name of the renderer. Must be unique.
     * @param sceneManager1 - SceneManager for renderer.
     * @param metaManager - Optional MetaManager. Used for possible additional operations with metadata.
     */
    protected constructor(name: string, sceneManager1: SceneManager, metaManager?: MetaManager | undefined);
    /**
     * Set selection and hover lock mode.
     * @param selectionLocked - selection lock flag.
     */
    setSelectionLock(selectionLocked: boolean): void;
    /**
     * Set background color on renderer area.
     * @param color - Optional color. Default is white.
     */
    setBackgroundColor(color?: number): void;
    /**
     * Init renderer for chosen DOM element id.
     * @param domElementId - DOM element id for attaching renderer.
     */
    protected init(domElementId?: string): void;
    private onModelsProgress;
    private createCaption;
    private initMainComposer;
    private initStateComposer;
    private initMixComposer;
    private initPickingTarget;
    protected onResize(): void;
    private initCamera;
    /**
     *Zoom camera to scene boundaries if no elements selected or zoom to selected elements boundaries.
     * @param fitRatio - scale coefficient for zoom
     */
    zoomCameraToSelection(fitRatio?: number): void;
    /**
     * Make request for new animation iteration or/and render new frame.
     * @param forceUpdateRender - is we need to render new frame.
     */
    abstract requestUpdate(forceUpdateRender: boolean): void;
    protected destroy(): void;
    protected processHover(): void;
    updateHover(elNum?: number): void;
}
