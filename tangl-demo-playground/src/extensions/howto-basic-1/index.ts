import {ExtensionBase, ElementState, RenderEvents} from 'tangl-viewer';
import {Color} from "three";

export class HowtoBasicExtension1 extends ExtensionBase {
	static getName = (): string => "howto-basic-1"; //contains the name of the extension
	isActive: boolean = false;

	constructor(viewerName: string) {
		super(viewerName);
	}

	sharedToolbarRender(container: HTMLElement) {
		const button = document.createElement("button");
		button.innerHTML = "Click Me!";
		button.addEventListener("click",()=>{
			this.isActive = !this.isActive;
		});

		container.appendChild(button);
	}

	onClick() {
		const renderManager = this.getRenderManager();
		if (renderManager.hoveredElNum == -1 || !this.isActive) return;
		const randomColor = new Color(0xffffff).setHex(Math.random() * 0xffffff);
		renderManager.sceneManager.tools.setElementsColor([renderManager.hoveredElNum], randomColor.getHex())
		renderManager.sceneManager.tools.setElementsState([renderManager.hoveredElNum], ElementState.Normal)
		renderManager.requestUpdate();

	}

	added(): void {
		const renderManager = this.getRenderManager();
		this.onClick = this.onClick.bind(this)
		renderManager?.addEventListener(RenderEvents.Click, this.onClick)
	}

	deleted(): void {
		const renderManager = this.getRenderManager();
		renderManager?.removeEventListener(RenderEvents.Click, this.onClick)
	}
}
