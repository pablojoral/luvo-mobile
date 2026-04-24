import { ImageName } from 'components/SvgImage/images';

export interface AvatarOption {
  id: number;
  imageName: ImageName;
  color: string;
}

export const AVATARS: AvatarOption[] = [
  { id: 1, imageName: 'avatar-sock',            color: '#F2C4CE' },
  { id: 2, imageName: 'avatar-detergent',        color: '#C8E6C9' },
  { id: 3, imageName: 'avatar-washing-machine',  color: '#F2C4CE' },
  { id: 4, imageName: 'avatar-laundry-basket',   color: '#C8E6C9' },
  { id: 5, imageName: 'avatar-pants',            color: '#D1C4E9' },
];

export function getAvatar(id?: number | null): AvatarOption {
  return AVATARS.find(a => a.id === id) ?? AVATARS[0];
}
