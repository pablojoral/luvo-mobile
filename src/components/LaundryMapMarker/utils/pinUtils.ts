// Circle center (20,20) radius 18. Nib base at ±77° (16,37.5)/(24,37.5), tip at (20,43).
export const PIN_PATH =
  'M 16 37.5 A 18 18 0 1 1 24 37.5 L 20 43 Z';

export const PIN_VIEWBOX_WIDTH  = 40;
export const PIN_VIEWBOX_HEIGHT = 50;

/**
 * Builds the SVG fill path that rises from the bottom based on ratio.
 * When partial the top edge has a gentle wave; at 0 or 1 it is flat.
 */
export function buildFillPath(ratio: number): string {
  const y   = PIN_VIEWBOX_HEIGHT * (1 - ratio);
  const amp = ratio > 0 && ratio < 1 ? 2 : 0;
  return [
    `M 0 ${y}`,
    `C 8 ${y - amp}, 16 ${y + amp}, 20 ${y}`,
    `C 24 ${y - amp}, 32 ${y + amp}, ${PIN_VIEWBOX_WIDTH} ${y}`,
    `L ${PIN_VIEWBOX_WIDTH} ${PIN_VIEWBOX_HEIGHT}`,
    `L 0 ${PIN_VIEWBOX_HEIGHT}`,
    'Z',
  ].join(' ');
}

