import { Avatar } from 'features/Account/components/Avatar/Avatar';
import { Text } from '@luvo/ui';
import { View } from 'react-native';
import { useAccountIdentityCardTheme } from './theme/useAccountIdentityCardTheme';

interface AccountIdentityCardProps {
  name: string;
  avatarId?: number | null;
  clientLabel: string;
}

export const AccountIdentityCard = ({ name, avatarId, clientLabel }: AccountIdentityCardProps) => {
  const { styles, AVATAR_SIZE } = useAccountIdentityCardTheme();

  return (
    <View style={styles.container}>
      <Avatar avatarId={avatarId} size={AVATAR_SIZE} variant="squircle" />
      <View style={styles.textContainer}>
        <Text fontSize="font-size-xs" fontWeight="bold" color="font-light" style={styles.clientLabel}>
          {clientLabel}
        </Text>
        <Text fontSize="font-size-lg" fontWeight="extrabold">
          {name}
        </Text>
      </View>
    </View>
  );
};
