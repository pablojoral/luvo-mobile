import { Pressable } from 'react-native';
import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Text } from 'components/Text/Text';
import { useReportScanButtonTheme } from './theme/useReportScanButtonTheme';

interface ReportScanButtonProps {
  label: string;
  onPress: () => void;
}

export const ReportScanButton = ({ label, onPress }: ReportScanButtonProps) => {
  const { styles } = useReportScanButtonTheme();

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <SvgIcon name="QrCode" size="icon-size-md" color="font-secondary" />
      <Text fontSize="font-size-md" color="font-secondary" style={styles.label}>
        {label}
      </Text>
    </Pressable>
  );
};
