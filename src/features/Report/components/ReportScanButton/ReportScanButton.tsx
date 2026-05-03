import { Pressable, View } from 'react-native';
import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Text } from 'components/Text/Text';
import { useReportScanButtonTheme } from './theme/useReportScanButtonTheme';

interface ReportScanButtonProps {
  hint: string;
  label: string;
  onPress: () => void;
}

export const ReportScanButton = ({ hint, label, onPress }: ReportScanButtonProps) => {
  const { styles } = useReportScanButtonTheme();

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <SvgIcon name="QrCode" size="icon-size-md" color="font-highlight" />
      <View style={styles.info}>
        <Text fontSize="font-size-xs" color="font-secondary">
          {hint}
        </Text>
        <Text fontSize="font-size-sm" fontWeight="semibold">
          {label}
        </Text>
      </View>
    </Pressable>
  );
};
