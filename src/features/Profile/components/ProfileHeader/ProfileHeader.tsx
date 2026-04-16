import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { SvgImage } from 'components/SvgImage/SvgImage';
import { Text } from 'components/Text/Text';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'theme/hooks/useTheme';

interface ProfileHeaderProps {
  name: string;
}

export const ProfileHeader = ({ name }: ProfileHeaderProps) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: theme.surfaceColor['surface-primary'],
      paddingHorizontal: theme.spacing['spacing-xl'],
      paddingVertical: theme.spacing['spacing-md'],
      paddingTop: theme.topInset + theme.spacing['spacing-xl'],
    },
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing['spacing-xl'],
    },
    textContainer: {
      gap: theme.spacing['spacing-xs'],
    },
    iconContainer: {
      // alignSelf: 'flex-end',
    },
  });

  const title = 'Hola,';

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <SvgImage name={'profile-placeholder'} height={86} width={86} />
        <View style={styles.textContainer}>
          <Text fontSize={'font-size-xxl'}>{title}</Text>
          <Text fontSize={'font-size-xxl'} fontWeight={'semibold'}>
            {name}
          </Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <SvgIcon name="LuvoCircle" size="font-size-xxl" />
      </View>
    </View>
  );
};
