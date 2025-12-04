import { useState } from 'react';
import type { Grid, Color } from '../types';
import { GRID_SIZE, colorToRgb } from '../types';

interface PixelGridProps {
  grid: Grid;
  onPixelClick: (x: number, y: number) => void;
  onPixelDrag: (x: number, y: number) => void;
}

export function PixelGrid({ grid, onPixelClick, onPixelDrag }: PixelGridProps) {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = (x: number, y: number) => {
    setIsMouseDown(true);
    onPixelClick(x, y);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseEnter = (x: number, y: number) => {
    if (isMouseDown) {
      onPixelDrag(x, y);
    }
  };

  return (
    <div
      className="grid gap-1 p-4 bg-gray-900 rounded-xl shadow-2xl"
      style={{
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
      }}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {grid.map((row, y) =>
        row.map((color: Color, x: number) => (
          <button
            key={`${x}-${y}`}
            className="aspect-square w-10 sm:w-12 md:w-14 rounded-md border border-gray-700 
                       transition-all duration-100 hover:scale-105 hover:border-gray-500
                       cursor-pointer active:scale-95"
            style={{
              backgroundColor: colorToRgb(color),
              boxShadow: isLit(color) ? `0 0 10px ${colorToRgb(color)}` : 'none',
            }}
            onMouseDown={() => handleMouseDown(x, y)}
            onMouseEnter={() => handleMouseEnter(x, y)}
            aria-label={`Pixel ${x}, ${y}`}
          />
        ))
      )}
    </div>
  );
}

function isLit(color: Color): boolean {
  return color.r > 30 || color.g > 30 || color.b > 30;
}
