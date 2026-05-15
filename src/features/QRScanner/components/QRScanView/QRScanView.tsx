import { Text } from '@luvo/ui';
import { View } from 'react-native';
import { QRViewfinder } from 'features/Scan/components/QRViewfinder/QRViewfinder';
import { useQRScanViewTheme } from './theme/useQRScanViewTheme';

interface QRScanViewProps {
  scanned: boolean;
  title: string;
  subtitle: string;
}

export const QRScanView = ({ scanned, title, subtitle }: QRScanViewProps) => {
  const { styles } = useQRScanViewTheme();

  return (
    <View style={styles.container}>
      <View style={styles.viewfinderRow}>
        <QRViewfinder isActive={!scanned} />
      </View>
      <View style={styles.instructions}>
        <Text fontSize="font-size-lg" fontWeight="bold" color="font-invert" textAlign="center">
          {title}
        </Text>
        <Text fontSize="font-size-sm" color="font-invert" lineHeight="line-height-lg" textAlign="center">
          {subtitle}
        </Text>
      </View>
    </View>
  );
};
