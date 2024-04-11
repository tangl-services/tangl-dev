import {
	ExtensionBase,
	RenderEvents,
	SceneEvents,
	ScreenPoints, ScreenPointsMaterial, ScreenPointsMaterials
} from 'tangl-viewer';
import {BoxGeometry, Mesh, MeshNormalMaterial, Vector3} from "three";
import defaultWorldUnitsMaterial = ScreenPointsMaterials.defaultWorldUnitsMaterial;
import defaultScreenUnitsMaterial = ScreenPointsMaterials.defaultScreenUnitsMaterial;

const mat = new ScreenPointsMaterial({worldUnits: true})
const randomNumber = (min: number, max: number) => Math.random() * (max - min) + min

export class MakingGeom1Extension extends ExtensionBase {
	static getName = (): string => "making-geom-1";
	pointCounter = 1000000;
	point = new ScreenPoints(this.pointCounter, defaultWorldUnitsMaterial).fill("red", 0.5, 0.1)

	constructor(viewerName: string) {
		super(viewerName);
	}

	genPointCloud() {
		const renderManager = this.getRenderManager();
		const sceneManager = renderManager.sceneManager;
		const sceneBox = sceneManager.sceneBox;
		const {min, max} = sceneBox;
		const points = [] as number[];
		const colors = [] as number[];
		for (let i = 0; i < this.pointCounter; i++) {
			const x = randomNumber(min.x, max.x);
			const y = randomNumber(min.y, max.y);
			const z = randomNumber(min.z, max.z);

			const r = (x - min.x) / (max.x - min.x);
			const g = (y - min.y) / (max.y - min.y);
			const b = (z - min.z) / (max.z - min.z);
			const a = (x - min.x) / (max.x - min.x);

			points.push(x, y, z)
			colors.push(r, g, b, a)
		}
		this.point.setPositions(points)
		this.point.setColors(colors)
		renderManager.requestUpdate()
	}

	added(): void {
		const renderManager = this.getRenderManager();
		renderManager.subScene.add(this.point)
		renderManager.sceneManager.addAutoEventListener(SceneEvents.AllLoaded, () => {
			this.genPointCloud();
		}, renderManager.ac.signal)
	}

	deleted(): void {
	}
}
