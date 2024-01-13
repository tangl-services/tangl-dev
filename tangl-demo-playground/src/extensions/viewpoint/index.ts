import {ExtensionBase} from "tangl-viewer";
import {Vector3} from "three";

class ViewpointState {
	isViewpointStored = false;
	cameraPosition: Vector3 = new Vector3();
	cameraTarget: Vector3 = new Vector3();
}

export class ViewpointExtension extends ExtensionBase {
	static getName = (): string => "viewpoint";
	state = new ViewpointState();


	constructor(viewerName: string) {
		super(viewerName);
	}

	added(): void {
	}

	deleted(): void {
	}

	storeViewpoint() {
		const renderManager = this.getRenderManager();

		this.state.cameraPosition.copy(renderManager.camera.position);
		this.state.cameraTarget.copy(renderManager.cameraTarget);

		this.state.isViewpointStored = true;
	}

	restoreViewpoint() {
		if (!this.state.isViewpointStored) return;

		const renderManager = this.getRenderManager();

		renderManager.camera.position.copy(this.state.cameraPosition)
		renderManager.cameraTarget.copy(this.state.cameraTarget)
		renderManager.camera.lookAt(renderManager.cameraTarget);

		renderManager.cubeControl.onNavChange();
		renderManager.requestUpdate()
	}

}
