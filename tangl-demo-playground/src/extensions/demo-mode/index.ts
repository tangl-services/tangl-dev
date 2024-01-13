import {ElementState, ModeExtensionBase, SceneEvents} from "tangl-viewer";
import {BufferAttribute, BufferGeometry, Color, InstancedBufferAttribute, InstancedMesh} from 'three';
import DedicatedToolbar from "./DedicatedToolbar.vue"
import {createVNode, render} from "vue";

export class DemoModeExtension extends ModeExtensionBase {
	static getName = (): string => "demo-mode";

	isWhiteVisible = true;
	isColoredVisible = true;

	private isSelected: boolean = false;

	dedicatedToolbarRender(container: HTMLElement) {
		let vnode = createVNode(DedicatedToolbar, {ext: this})
		render(vnode, container)
	}

	selected(): void {
		this.isSelected = true;
		this.setup()
	}

	unselected(): void {
		this.isSelected = false;
	}

	added(): void {
		const renderManager = this.getRenderManager();
		this.onHover = this.onHover.bind(this)
		renderManager?.sceneManager.addEventListener(SceneEvents.Selected, this.onHover)

	}

	deleted(): void {
		const renderManager = this.getRenderManager();
		renderManager?.sceneManager.removeEventListener(SceneEvents.Selected, this.onHover)
	}


	onHover() {
		const renderManager = this.getRenderManager();
		if (!this.isSelected) return;

		if (renderManager.hoveredElNum == -1 || !this.isSelected) return;

		const randomColor = new Color(0xffffff).setHex(Math.random() * 0xffffff);
		this.setData([renderManager.hoveredElNum], [randomColor], undefined)
	}


	clear() {
		this.resArray = new Array<any>();
		this.setup();
	}

	setup() {
		let colorArray: Float32Array;
		let stateArray: Float32Array;
		let resArray: any;

		const renderMan = this.getRenderManager();
		const sm = renderMan.sceneManager;
		const isEmpty = this.els.length == 0;

		sm.traverseElementsWithValues(this.els, this.res,
			(g: BufferGeometry, el: number, idx: number, val: any) => {
				if (this.els.length > 0)
					if (!resArray[idx])
						resArray[idx] = val;
			},
			(g: BufferGeometry) => {
//				colorArray = new Float32Array(g.getAttribute("color").array);
				colorArray = new Float32Array(resArray.length * 3);

				for (let i = 0; i < resArray.length; i++) {

					const color = resArray[i] == undefined ? new Color(0xffffff) : resArray[i];
					colorArray[i * 3] = color.r;
					colorArray[i * 3 + 1] = color.g;
					colorArray[i * 3 + 2] = color.b;


					let state = ElementState.White;
					if (!resArray[i] && !this.isWhiteVisible)
						state = ElementState.Hidden;

					if (resArray[i] && !this.isColoredVisible)
						state = ElementState.Hidden;

					stateArray[i] = state;
				}

				g.setAttribute("color", new BufferAttribute(colorArray, 3));
				g.setAttribute("state_1", new BufferAttribute(stateArray, 1));
			},
			(g: BufferGeometry, meshIdx: number) => {
				if (this.resArray[meshIdx] == undefined)
					this.resArray[meshIdx] = new Array(g.getAttribute("color").count);
				resArray = this.resArray[meshIdx];

				if (this.stateArray[meshIdx] == undefined)
					this.stateArray[meshIdx] = new Float32Array(g.getAttribute("state_1").array);
				stateArray = this.stateArray[meshIdx];
			},
			(mesh, meshIdx, elNum, matrix, idx, val) => {
				if (!isEmpty)
					if (!resArray[idx])
						resArray[idx] = val;

				const colorAttr = mesh.geometry.getAttribute("color") as InstancedBufferAttribute
				const stateAttr = mesh.geometry.getAttribute("state_1") as InstancedBufferAttribute


				const color = resArray[idx] == undefined ? new Color(0xffffff) : resArray[idx];

				let state = ElementState.White;
				if (!resArray[idx] && !this.isWhiteVisible)
					state = ElementState.Hidden;

				if (resArray[idx] && !this.isColoredVisible)
					state = ElementState.Hidden;

				stateAttr.set([state], idx)
				stateAttr.needsUpdate = true

				colorAttr.setXYZ(idx, color.r, color.g, color.b)
				colorAttr.needsUpdate = true;

			},
			(child: InstancedMesh, meshIdx: number) => {
				if (this.resArray[meshIdx] == undefined)
					this.resArray[meshIdx] = new Array(child.geometry.getAttribute("color").count);
				resArray = this.resArray[meshIdx];

				if (this.stateArray[meshIdx] == undefined)
					this.stateArray[meshIdx] = new Float32Array(child.geometry.getAttribute("state_1").array);
				stateArray = this.stateArray[meshIdx];
			}
		);

		this.els = [];
		this.res = [];

		renderMan.requestUpdate();
	}

	constructor(viewerName: string) {
		super(viewerName, "demoModeExt.name", "mdi-brush-variant");
	}


}
