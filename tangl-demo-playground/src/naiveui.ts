import {GlobalThemeOverrides} from "naive-ui";

const primaryColor = "#02abde"

export const tanglTheme: GlobalThemeOverrides = {
	common: {
		borderRadius: "0px",
		cubicBezierEaseInOut: "none",
		cubicBezierEaseOut: "none",
		cubicBezierEaseIn: "none",
		primaryColor: primaryColor,
		primaryColorHover: "#02abde55",
		scrollbarColor: "#55555588",
		scrollbarColorHover: "#555555",
		fontSize: "1rem"
	},
	Switch: {
		railColorActive: primaryColor,
	},
	Slider: {
		railHeight: "2px",
		handleSize: "12px",
		markFontSize: "80%",
		handleColor: primaryColor
	},
};
