import type { SvgProps } from 'react-native-svg';

import AvatarDetergent from './avatar-detergent.svg';
import AvatarLaundryBasket from './avatar-laundry-basket.svg';
import AvatarPants from './avatar-pants.svg';
import AvatarSock from './avatar-sock.svg';
import AvatarWashingMachine from './avatar-washing-machine.svg';
import LaundrySmall from './laundry-image-small.svg';
import LuvoLogoPink from './luvo-logo-pink.svg';
import ProfilePlaceholder from './profile-placeholder.svg';
import QrTarget from './qr-target.svg';
import WaveLaundryCard from './wave-laundry-card.svg';
import WaveProfile from './wave-profile.svg';

export const images = {
  'avatar-sock': AvatarSock,
  'avatar-detergent': AvatarDetergent,
  'avatar-washing-machine': AvatarWashingMachine,
  'avatar-laundry-basket': AvatarLaundryBasket,
  'avatar-pants': AvatarPants,
  'laundry-small': LaundrySmall,
  'luvo-logo-pink': LuvoLogoPink,
  'profile-placeholder': ProfilePlaceholder,
  'qr-target': QrTarget,
  'wave-laundry-card': WaveLaundryCard,
  'wave-profile': WaveProfile,
} as const;

export type ImageName = keyof typeof images;
export type ImageComponent = React.FC<SvgProps>;
