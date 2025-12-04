import type { Color } from '../types';
import { PRESET_COLORS, colorToRgb, colorToHex, hexToColor, colorsEqual } from '../types';

interface ColorPickerProps {
  selectedColor: Color;
  onColorChange: (color: Color) => void;
}

export function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-200">Pick a Color</h2>
      
      {/* Preset colors */}
      <div className="flex flex-wrap gap-2">
        {PRESET_COLORS.map((color, index) => (
          <button
            key={index}
            className={`w-10 h-10 rounded-lg border-2 transition-transform hover:scale-110 ${
              colorsEqual(color, selectedColor)
                ? 'border-white ring-2 ring-blue-400'
                : 'border-gray-600'
            }`}
            style={{ backgroundColor: colorToRgb(color) }}
            onClick={() => onColorChange(color)}
            aria-label={`Select color ${index + 1}`}
          />
        ))}
      </div>

      {/* Custom color picker */}
      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-400">Custom:</label>
        <input
          type="color"
          value={colorToHex(selectedColor)}
          onChange={(e) => onColorChange(hexToColor(e.target.value))}
          className="w-12 h-10 rounded cursor-pointer border-0 bg-transparent"
        />
        <span className="text-sm text-gray-400 font-mono">
          {colorToHex(selectedColor).toUpperCase()}
        </span>
      </div>

      {/* RGB sliders */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="w-6 text-sm text-red-400 font-semibold">R</span>
          <input
            type="range"
            min="0"
            max="255"
            value={selectedColor.r}
            onChange={(e) => onColorChange({ ...selectedColor, r: parseInt(e.target.value) })}
            className="flex-1 accent-red-500"
          />
          <span className="w-8 text-sm text-gray-400 text-right">{selectedColor.r}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 text-sm text-green-400 font-semibold">G</span>
          <input
            type="range"
            min="0"
            max="255"
            value={selectedColor.g}
            onChange={(e) => onColorChange({ ...selectedColor, g: parseInt(e.target.value) })}
            className="flex-1 accent-green-500"
          />
          <span className="w-8 text-sm text-gray-400 text-right">{selectedColor.g}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 text-sm text-blue-400 font-semibold">B</span>
          <input
            type="range"
            min="0"
            max="255"
            value={selectedColor.b}
            onChange={(e) => onColorChange({ ...selectedColor, b: parseInt(e.target.value) })}
            className="flex-1 accent-blue-500"
          />
          <span className="w-8 text-sm text-gray-400 text-right">{selectedColor.b}</span>
        </div>
      </div>

      {/* Selected color preview */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400">Selected:</span>
        <div
          className="w-16 h-10 rounded-lg border-2 border-gray-600"
          style={{ backgroundColor: colorToRgb(selectedColor) }}
        />
      </div>
    </div>
  );
}
