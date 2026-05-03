import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Text } from 'components/Text/Text';
import { View } from 'react-native';

import { useMyLaundryEmptyListTheme } from './theme/useMyLaundryEmptyListTheme';
import { useMyLaundryEmptyListStrings } from './hooks/useMyLaundryEmptyListStrings';

export const MyLaundryEmptyList = () => {
  const { styles } = useMyLaundryEmptyListTheme();
  const { title, body } = useMyLaundryEmptyListStrings();

  return (
    <View style={styles.container}>
      <SvgIcon name={'Star'} size="icon-size-xxxl" />
      <Text fontSize="font-size-lg" fontWeight="semibold">
        {title}
      </Text>
      <Text fontSize="font-size-sm" color={'font-disabled'} style={styles.emptyText}>
        {body}
      </Text>
    </View>
  );
};
