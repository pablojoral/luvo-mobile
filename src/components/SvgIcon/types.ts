// Shim: IconName is derived from the SvgIconProps.name field exported by @luvo/ui.
// The type is not separately exported at the @luvo/ui root, so we derive it here
// to preserve the import path 'components/SvgIcon/types' used across the codebase.
import type { SvgIconProps } from '@luvo/ui';

export type IconName = SvgIconProps['name'];
