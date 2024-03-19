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

export class MakingGeom1Extension extends ExtensionBase {
	static getName = (): string => "making-geom-1"; //contains the name of the extension

	// pointCloud = new ScreenPoints(100000, defaultWorldUnitsMaterial)
	// 	.fill("#00ff00", 0.5, 1.1);
	//

	// pointSpheres = new ScreenPoints(100, defaultScreenUnitsMaterial)
	// 	.fill("#00ff00", 0.5, 0.3);

	point = new ScreenPoints(10000, defaultWorldUnitsMaterial).fill("#ff0000", 0.5, 0.3)


	constructor(viewerName: string) {
		super(viewerName);
	}

	// genPointCloud() {
	// 	const renderManager = this.getRenderManager();
	//
	// 	const points: number[] = []
	// 	const colors: number[] = []
	// 	const size: number[] = []
	//
	// 	const sceneSize = renderManager.sceneManager.sceneBox.getSize(new Vector3())
	// 	const sceneMin = renderManager.sceneManager.sceneBox.min.clone();
	//
	// 	for (let i = 0; i < this.pointCloud.maxCount; i++) {
	// 		const px = Math.random() * sceneSize.x + sceneMin.x;
	// 		const pz = Math.random() * sceneSize.z + +sceneMin.z;
	//
	// 		const wposY = (px + sceneSize.x / 2) * (pz + sceneSize.z / 2) * 0.03
	// 		const sinVal = Math.sin(wposY * 0.5 % Math.PI * 1.2) * 0.5 + 0.5;
	//
	// 		points.push(
	// 			px,
	// 			sceneMin.y + 5 + sinVal * (0.5 + Math.random() * 0.5) * 10,
	// 			pz,
	// 		)
	//
	//
	// 		colors.push(
	// 			sinVal * (0.9 + Math.random() * 0.1),
	// 			sinVal * (0.9 + Math.random() * 0.1) * 0.5,
	// 			0.5 + Math.random() * 0.5,
	// 			0.3 + sinVal * 0.3
	// 		)
	//
	// 		size.push(
	// 			0.0001 + sinVal / 10
	// 		)
	// 	}
	//
	//
	// 	this.pointCloud.geometry.setPositions(points)
	// 	this.pointCloud.geometry.setColors(colors)
	// 	this.pointCloud.geometry.setSize(size)
	// }

	// genPointSpheres() {
	// 	const renderManager = this.getRenderManager();
	//
	// 	const boxGeometry = new BoxGeometry(1, 1, 0.1);
	// 	const boxMesh = new Mesh(
	// 		boxGeometry,
	// 		new MeshNormalMaterial()
	// 	)
	// 	// renderManager.subScene.add(boxMesh);
	//
	// 	for (let i = 0; i < 1; i++) {
	// 		const coord = new Vector3(/*Math.random() * 10, Math.random() * 10, Math.random() * 10*/);
	// 		this.pointSpheres
	// 			.push(coord, "#ff0000", 1, 0.3/*Math.abs(Math.cos(coord.x / 36) / 10)*/
	// 			)
	// 	}
	// }

	added(): void {
		const renderManager = this.getRenderManager();

		// renderManager.helpersScene.add(this.point)
		renderManager.subScene.add(this.point)


		// const points = [] as Vector3[];
		// for (let i = 0; i < 10; i++) {
		// 	const x = Math.random() * 10;
		// 	const y = Math.random() * 10;
		// 	const z = Math.random() * 10;
		//
		// 	points.push(new Vector3(x, y, z))
		// }

		const points = [] as number[];
		const colors = [] as number[];

		for (let i = 0; i < 10000; i++) {
			const x = Math.random();
			const y = Math.random();
			const z = Math.random();

			const r = x;
			const g = y;
			const b = Math.random();
			const a = x;

			points.push(x * 10, y * 10, z * 10)
			colors.push(r, g, b, a)
		}

		//this.point.material.reduceNearScreenSize = 0;

		this.point.geometry.setPositions(points)
		this.point.geometry.setColors(colors)

		// this.point.fromPoints(points)
		//this.point.geometry.setPointsDrawRange(10);


		// renderManager.helpersScene.add(this.pointSpheres)
		// renderManager.subScene.add(this.pointCloud)
		//
		// renderManager?.addAutoEventListener(RenderEvents.Click, () => {
		// })
		//
		// renderManager.sceneManager.addAutoEventListener(SceneEvents.AllLoaded, () => {
		// 	this.genPointCloud();
		// 	this.genPointSpheres()
		// })
	}

	deleted(): void {
	}
}
