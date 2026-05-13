import type { SvgImageProps } from '@luvo/ui';

type ImageName = SvgImageProps['name'];

// Fixed brand palette values — not theme tokens; update if brand colors change
const AVATAR_COLOR_ROSE   = '#F2C4CE';
const AVATAR_COLOR_SAGE   = '#C8E6C9';
const AVATAR_COLOR_VIOLET = '#D1C4E9';

export interface AvatarOption {
  id: number;
  imageName: ImageName;
  color: string;
}

export const AVATARS: AvatarOption[] = [
  { id: 1, imageName: 'avatar-sock',            color: AVATAR_COLOR_ROSE   },
  { id: 2, imageName: 'avatar-detergent',        color: AVATAR_COLOR_SAGE   },
  { id: 3, imageName: 'avatar-washing-machine',  color: AVATAR_COLOR_ROSE   },
  { id: 4, imageName: 'avatar-laundry-basket',   color: AVATAR_COLOR_SAGE   },
  { id: 5, imageName: 'avatar-pants',            color: AVATAR_COLOR_VIOLET },
];

export function getAvatar(id?: number | null): AvatarOption {
  return AVATARS.find(a => a.id === id) ?? AVATARS[0];
}
