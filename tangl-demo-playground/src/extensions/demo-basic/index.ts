import {ExtensionBase, ElementState, RenderEvents} from 'tangl-viewer';
import {sceneManager} from "../../managers";
import {Color} from "three";
import {createVNode, render} from 'vue';
import SharedToolbar from "./SharedToolbar.vue"

export class DemoBasicExtension extends ExtensionBase {
	isActive: boolean = false;
	static getName = (): string => "demo-basic";

	sharedToolbarRender(container: HTMLElement) {
		let vnode = createVNode(SharedToolbar, {extName: this.getName(), viewerName: this.viewerName})
		//vnode.appContext = app._context;
		render(vnode, container)
	}

	added(): void {
		const renderManager = this.getRenderManager();
		this.onHover = this.onHover.bind(this)
		renderManager?.addEventListener(RenderEvents.Hover, this.onHover)
	}

	deleted(): void {
		const renderManager = this.getRenderManager();
		renderManager?.removeEventListener(RenderEvents.Click, this.onHover)
	}

	commandChanged() {
		this.isActive = false;
	}

	switchMode() {
		const renderManager = this.getRenderManager()!;
		this.isActive = !this.isActive;

		if (this.isActive)
			renderManager.extMan.setCurrentCommandExtension(this.getName())
		else
			renderManager.extMan.finishCurrentCommandExtension();
	}

	onHover() {
		const renderManager = this.getRenderManager();
		if (renderManager.hoveredElNum == -1 || !this.isActive) return;

		const randomColor = new Color(0xffffff).setHex(Math.random() * 0xffffff);

		sceneManager.tools.setElementsColor([renderManager.hoveredElNum], randomColor.getHex())
		sceneManager.tools.setElementsState([renderManager.hoveredElNum], ElementState.Normal)

		renderManager.requestUpdate();
	}

	constructor(viewerName: string) {
		super(viewerName);
	}
}
