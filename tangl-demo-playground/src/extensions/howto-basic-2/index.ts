import {ExtensionBase, ElementState, RenderEvents} from 'tangl-viewer';
import {Color} from "three";

export class HowtoBasicExtension2 extends ExtensionBase {
	static getName = (): string => "howto-basic-2"; //contains the name of the extension
	isActive: boolean = false;

	colorDiv = document.createElement("div");

	constructor(viewerName: string, args: { hideToolbar: boolean }) {
		super(viewerName);

		this.hideToolbar = args.hideToolbar;
	}

	uiRender(container: HTMLElement) {
		const div = document.createElement("div");

		this.colorDiv.innerHTML = "Hello!"
		this.colorDiv.style.display = "none"
		this.colorDiv.style.position = "relative"
		this.colorDiv.style.top = "80vh"
		this.colorDiv.style.margin = "15px"
		this.colorDiv.style.backgroundColor = "gray"
		this.colorDiv.style.color = "white"
		this.colorDiv.style.padding = "5px"

		container.appendChild(this.colorDiv);
	}

	sharedToolbarRender(container: HTMLElement) {
		const renderManager = this.getRenderManager();
		const button = document.createElement("button");
		button.innerHTML = "Click Me!";
		button.addEventListener("click", () => {
			this.isActive = !this.isActive;
			if (this.isActive) {
				renderManager.extMan.setCurrentCommandExtension(this.getName())
				renderManager.setSelectionLock(true);
				this.colorDiv.style.display = "block"

			} else {
				renderManager.setSelectionLock(false);
				renderManager.extMan.finishCurrentCommandExtension();
				this.colorDiv.style.display = "none"
			}

		});

		container.appendChild(button);
	}

	commandChanged() {
		const renderManager = this.getRenderManager();
		this.isActive = false;
		renderManager.setSelectionLock(false);
		this.colorDiv.style.display = "none"
	}

	onClick() {
		if (!this.isActive) return;

		const renderManager = this.getRenderManager();

		if (renderManager.hoveredElNum == -1 || !this.isActive) return;

		const randomColor = new Color(0xffffff).setHex(Math.random() * 0xffffff);

		renderManager.sceneManager.tools.setElementsColor([renderManager.hoveredElNum], randomColor.getHex())
		renderManager.sceneManager.tools.setElementsState([renderManager.hoveredElNum], ElementState.Normal)

		renderManager.requestUpdate();

		this.colorDiv.innerHTML = randomColor.getHexString()
		this.colorDiv.style.backgroundColor = "#" + randomColor.getHexString()
	}

	added(): void {
		const renderManager = this.getRenderManager();
		renderManager?.addEventListener(RenderEvents.Click, () => this.onClick())
	}

	deleted(): void {
	}
}
