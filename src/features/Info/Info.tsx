import { SafeScreenHeader } from 'components/SafeScreenHeader/SafeScreenHeader';
import { SettingsMenu } from 'components/SettingsMenu/SettingsMenu';
import { View } from 'react-native';

import { useInfoScreen } from './hooks/useInfoScreen';
import { useInfoTheme } from './theme/useInfoTheme';

export const Info = () => {
  const { styles } = useInfoTheme();
  const { title, items, handleGoBack } = useInfoScreen();

  return (
    <View style={styles.container}>
      <SafeScreenHeader title={title} onBack={handleGoBack} />
      <View style={styles.scrollContent}>
        <SettingsMenu items={items} />
      </View>
    </View>
  );
};
