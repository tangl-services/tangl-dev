import {MOUSE, TOUCH} from "three";

export class RenderManagerSettings {
	backgroundColor = "#ffffff";

	inactiveColor = "#222222"
	inactiveDarkness = 0.7;
	inactiveContrast = 0.2;
	inactiveFrontOpacity = 0.5;

	selectionColor = "#00bbff";
	selectionOpacity = 0.6;

	blockControls = false;
	lockSelection = false;

	multiselectTouch = false;
	multiselectClick = false;
}

export class PickerSettings {
	stopAtClick = false;
	snapToPoints = false;
}

export class OrbitSettings {
	// minDistance = 0.3;
	// maxDistance = 10000;
	//
	// minZoom = 0.001;
	// maxZoom = 1;
	//
	// minPolarAngle = 0; // radians
	// maxPolarAngle = Math.PI; // radians
	//
	// minAzimuthAngle = -Infinity; // radians
	// maxAzimuthAngle = Infinity; // radians

	zoomSpeed = 0.3;
	zoomDollySpeed = 0.5;

	leftMouseButton: MOUSE | undefined = undefined;
	rightMouseButton: MOUSE | undefined = MOUSE.ROTATE;
	middleMouseButton: MOUSE | undefined = MOUSE.PAN;
	middleAltMouseButton: MOUSE | undefined = MOUSE.DOLLY;

	oneTap: TOUCH = TOUCH.ROTATE;
	twoTaps: TOUCH = TOUCH.DOLLY_PAN

	enableZoom = true;
	enableRotate = true;
	enablePan = true;

	autoRotate = false;
	autoRotateSpeed = 2.0;
}
