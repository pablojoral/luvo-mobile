import { Pressable, View } from 'react-native';
import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Text } from 'components/Text/Text';
import { IconName } from 'components/SvgIcon/types';
import { useReportEntityCardTheme } from './theme/useReportEntityCardTheme';

interface ReportEntityCardProps {
  iconName: IconName;
  typeLabel: string;
  name: string;
  onClear: () => void;
}

export const ReportEntityCard = ({ iconName, typeLabel, name, onClear }: ReportEntityCardProps) => {
  const { styles } = useReportEntityCardTheme();

  return (
    <View style={styles.container}>
      <SvgIcon name={iconName} size="icon-size-md" color="font-highlight" />
      <View style={styles.info}>
        <Text fontSize="font-size-xs" color="font-secondary">{typeLabel}</Text>
        <Text fontSize="font-size-sm" fontWeight="semibold">{name}</Text>
      </View>
      <Pressable style={styles.clearButton} onPress={onClear} hitSlop={8}>
        <Text fontSize="font-size-lg" color="font-secondary">×</Text>
      </Pressable>
    </View>
  );
};
