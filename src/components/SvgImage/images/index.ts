// Shim: ImageName is derived from the SvgImageProps.name field exported by @luvo/ui.
// The type is not separately exported at the @luvo/ui root, so we derive it here
// to preserve the import path 'components/SvgImage/images' used across the codebase.
import type { SvgImageProps } from '@luvo/ui';

export type ImageName = SvgImageProps['name'];
