import { Text } from 'components/Text/Text';
import { useAccountSectionLabelTheme } from './theme/useAccountSectionLabelTheme';

interface AccountSectionLabelProps {
  title: string;
}

export const AccountSectionLabel = ({ title }: AccountSectionLabelProps) => {
  const { styles } = useAccountSectionLabelTheme();

  return (
    <Text fontSize="font-size-xs" fontWeight="bold" color="font-light" style={styles.label}>
      {title}
    </Text>
  );
};
