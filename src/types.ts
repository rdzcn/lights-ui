export interface Color {
	r: number;
	g: number;
	b: number;
}

export type Grid = Color[][];

export const GRID_SIZE = 8;

export const DEFAULT_COLOR: Color = { r: 0, g: 0, b: 0 };

export const PRESET_COLORS: Color[] = [
	{ r: 255, g: 0, b: 0 },     // Red
	{ r: 255, g: 127, b: 0 },   // Orange
	{ r: 255, g: 255, b: 0 },   // Yellow
	{ r: 0, g: 255, b: 0 },     // Green
	{ r: 0, g: 255, b: 255 },   // Cyan
	{ r: 0, g: 0, b: 255 },     // Blue
	{ r: 127, g: 0, b: 255 },   // Purple
	{ r: 255, g: 0, b: 255 },   // Magenta
	{ r: 255, g: 255, b: 255 }, // White
	{ r: 0, g: 0, b: 0 },       // Black (off)
];

export function colorToRgb(color: Color): string {
	return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

export function colorToHex(color: Color): string {
	const toHex = (n: number) => n.toString(16).padStart(2, '0');
	return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
}

export function hexToColor(hex: string): Color {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (!result) {
		return DEFAULT_COLOR;
	}
	return {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16),
	};
}

export function createEmptyGrid(): Grid {
	return Array(GRID_SIZE)
		.fill(null)
		.map(() =>
			Array(GRID_SIZE)
				.fill(null)
				.map(() => ({ ...DEFAULT_COLOR }))
		);
}

export function colorsEqual(a: Color, b: Color): boolean {
	return a.r === b.r && a.g === b.g && a.b === b.b;
}
