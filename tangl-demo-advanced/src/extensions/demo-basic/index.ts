import {ExtensionBase, ElementState, RenderEvents} from 'tangl-viewer';
import {sceneManager} from "../../managers";
import {Color} from "three";

export class DemoBasicExtension extends ExtensionBase {
	isActive: boolean = false;
	static getName = (): string => "demo-basic";

	added(): void {
		const renderManager = this.getRenderManager();
		this.onClick = this.onClick.bind(this)
		renderManager?.addEventListener(RenderEvents.Hover, this.onClick)
	}

	deleted(): void {
		const renderManager = this.getRenderManager();
		renderManager?.removeEventListener(RenderEvents.Click, this.onClick)
	}

	onClick() {
		const renderManager = this.getRenderManager();
		if (renderManager.hoveredElNum == -1 || !this.isActive) return;

		const randomColor = new Color(0xffffff).setHex(Math.random() * 0xffffff);

		sceneManager.tools.setElementsColor([renderManager.hoveredElNum], randomColor.getHex(), [])
		sceneManager.tools.setElementsState([renderManager.hoveredElNum], ElementState.Normal, [])
	}

	constructor(viewerName: string) {
		super(viewerName);
	}
}