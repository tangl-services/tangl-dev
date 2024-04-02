import {defineStore} from "pinia";
import {useFileSystemAccess, useLocalStorage} from "@vueuse/core";
import {OrbitControllerExtension, viewerStore} from "tangl-viewer";
import {OrbitSettings, PickerSettings, RenderManagerSettings} from "../settings";
import {RenderManager} from "tangl-viewer";

export const useSettingsStore = defineStore("settings", {
	state() {
		const renderManager = useLocalStorage("tg-playground-renderManager",
			new RenderManagerSettings())

		const picker = useLocalStorage("tg-playground-picker",
			new PickerSettings())

		const orbit = useLocalStorage("tg-playground-orbit",
			new OrbitSettings())

		return {renderManager, picker, orbit}
	},
	actions: {
		export() {
			const label = "TanglViewerSettings";
			const exportData = {
				renderManager: this.renderManager,
				picker: this.picker,
				orbit: this.orbit
			}

			const dataStr = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, "\t"));

			const link = document.createElement('a')
			link.href = dataStr
			link.download = label
			link.click()
			URL.revokeObjectURL(link.href)
		},
		async import() {
			const fs = useFileSystemAccess({
				dataType: 'Text',
				types: [{
					description: 'JSON',
					accept: {
						'text/json': ['.json'],
					},
				}],
				excludeAcceptAllOption: true,
			})

			await fs.open()
			if (!fs.data?.value) return;

			const data = JSON.parse(fs.data.value)

			if (data.renderManager)
				this.renderManager = data.renderManager;

			if (data.picker)
				this.picker = data.picker;

			if (data.orbit)
				this.orbit = data.orbit;

			this.apply();
		},
		reset() {
			this.renderManager = new RenderManagerSettings()
			this.picker = new PickerSettings()
			this.orbit = new OrbitSettings()

			this.apply()
		},
		apply() {
			const rm = viewerStore.getRenderManager() as RenderManager;
			if (!rm) return;

			const rms = this.renderManager as RenderManagerSettings;

			if (!rm) return;

			rm.setBackgroundColor(rms.backgroundColor)

			rm.inactiveColor = rms.inactiveColor;
			rm.inactiveDarkness = rms.inactiveDarkness;
			rm.inactiveContrast = rms.inactiveContrast;
			rm.inactiveFrontOpacity = rms.inactiveFrontOpacity;

			rm.selectionColor = rms.selectionColor;
			rm.selectionOpacity = rms.selectionOpacity;

			rm.setSelectionLock(rms.lockSelection);

			rm.isMultiselectTouch = rms.multiselectTouch;
			rm.isMultiselectClick = rms.multiselectClick;


			const ext = rm.extMan.getExtensionByName("orbit");
			if (ext) {
				const orbitExt = (ext as any) as OrbitControllerExtension;
				orbitExt.options = Object.assign(orbitExt.options, this.orbit)
			}


			rm.requestUpdate();
		},
		sync() {
			this.renderManager = Object.assign(new RenderManagerSettings(), this.renderManager);
			this.orbit = Object.assign(new OrbitSettings(), this.orbit);
		},

	}
})
