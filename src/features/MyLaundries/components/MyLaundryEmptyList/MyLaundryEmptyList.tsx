import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Text } from 'components/Text/Text';
import { View } from 'react-native';

import { useMyLaundryEmptyListTheme } from './theme/useMyLaundryEmptyListTheme';
import { useMyLaundryEmptyList } from './hooks/useMyLaundryEmptyList';

export const MyLaundryEmptyList = () => {
  const { styles } = useMyLaundryEmptyListTheme();
  const { title, body } = useMyLaundryEmptyList();

  return (
    <View style={styles.container}>
      <SvgIcon name={'Star'} size="font-size-xxxxl" />
      <Text fontSize="font-size-lg" fontWeight="semibold">
        {title}
      </Text>
      <Text fontSize="font-size-sm" color={'font-disabled'} style={styles.emptyText}>
        {body}
      </Text>
    </View>
  );
};
