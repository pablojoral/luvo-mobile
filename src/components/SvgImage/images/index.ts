import type { SvgProps } from 'react-native-svg';

import LaundrySmall from './laundry-image-small.svg';
import LuvoLogoPink from './luvo-logo-pink.svg';
import ProfilePlaceholder from './profile-placeholder.svg';
import QrTarget from './qr-target.svg';
import WaveLaundryCard from './wave-laundry-card.svg';
import WaveProfile from './wave-profile.svg';

export const images = {
  'laundry-small': LaundrySmall,
  'luvo-logo-pink': LuvoLogoPink,
  'profile-placeholder': ProfilePlaceholder,
  'qr-target': QrTarget,
  'wave-laundry-card': WaveLaundryCard,
  'wave-profile': WaveProfile,
} as const;

export type ImageName = keyof typeof images;
export type ImageComponent = React.FC<SvgProps>;
