import { Colors } from 'theme/constants/colors';

export const PIN_PATH =
  'M12 2C7.03 2 3 6.03 3 10.5c0 6.5 7 12 8.5 13 .3.2.7.2 1 0C14 22.5 21 17 21 10.5 21 6.03 16.97 2 12 2z';

export const VIEWBOX_SIZE = 24;

/**
 * Builds the SVG fill path.
 * When partial (0 < ratio < 1) the top edge has a gentle wave.
 * At 0 or 1 the wave amplitude collapses to 0 (flat edge).
 */
export function buildFillPath(ratio: number, vb: number): string {
  const y   = vb * (1 - ratio);
  const amp = ratio > 0 && ratio < 1 ? 1.5 : 0;
  return [
    `M 0 ${y}`,
    `C 4 ${y - amp}, 8 ${y + amp}, 12 ${y}`,
    `C 16 ${y - amp}, 20 ${y + amp}, ${vb} ${y}`,
    `L ${vb} ${vb}`,
    `L 0 ${vb}`,
    'Z',
  ].join(' ');
}

export function getFillColor(ratio: number): string {
  if (ratio <= 0.33) return Colors['colors-lavender-300'];
  if (ratio <= 0.66) return Colors['colors-lavender-500'];
  return Colors['colors-lavender-600'];
}
