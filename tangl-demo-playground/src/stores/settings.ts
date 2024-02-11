import {defineStore} from "pinia";
import {useFileSystemAccess, useLocalStorage} from "@vueuse/core";
import {viewerStore} from "tangl-viewer";
import {RenderManagerSettings} from "../settings";
import {RenderManager} from "../../../../src/Tangl/tangl-viewer/src";

export const useSettingsStore = defineStore("settings", {
	state() {
		const renderManager = useLocalStorage("tg-playground-renderManager",
			new RenderManagerSettings())
		return {renderManager}
	},
	actions: {
		export() {
			const label = "TanglViewerSettings";
			const exportData = {
				renderManager: this.renderManager
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

			this.apply();
		},
		reset() {
			this.renderManager = new RenderManagerSettings()

			this.apply()
		},
		apply() {
			const rm = viewerStore.getRenderManager() as RenderManager;
			const rms = this.renderManager as RenderManagerSettings;

			if (!rm) return;

			rm.setBackgroundColor(rms.backgroundColor)

			rm.inactiveColor = rms.inactiveColor;
			rm.inactiveDarkness = rms.inactiveDarkness;
			rm.inactiveContrast = rms.inactiveContrast;
			rm.inactiveFrontOpacity = rms.inactiveFrontOpacity;

			rm.selectionColor = rms.selectionColor;
			rm.selectionOpacity = rms.selectionOpacity;

			if (rms.blockControls)
				rm.blockControls();
			else
				rm.unblockControls();

			rm.setSelectionLock(rms.lockSelection);

			rm.isMultiselectTouch = rms.multiselectTouch;
			rm.isMultiselectClick = rms.multiselectClick;

			rm.requestUpdate();
		},
		sync() {
			this.renderManager = Object.assign(new RenderManagerSettings(), this.renderManager);
		},

	}
})
