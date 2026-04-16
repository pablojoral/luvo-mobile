import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Text } from 'components/Text/Text';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { PaymentStrategy } from '../../strategies/PaymentStrategy';
import { useTheme } from 'theme/hooks/useTheme';
import { Colors } from 'theme/constants/colors';

interface Props {
  strategy:   PaymentStrategy;
  selected:   boolean;
  onSelect:   () => void;
}

export const PaymentMethodCard = ({ strategy, selected, onSelect }: Props) => {
  const theme = useTheme();

  const cardStyle = [
    styles.card,
    {
      borderRadius:    theme.cornerRad['corner-rad-lg'],
      padding:         theme.spacing['spacing-md'],
      borderWidth:     2,
      borderColor:     selected
        ? Colors['colors-lavender-500']
        : theme.borderColor['border-secondary'],
      backgroundColor: selected
        ? Colors['colors-lavender-50']
        : theme.surfaceColor['surface-primary'],
      opacity:         strategy.isAvailable ? 1 : 0.5,
    },
  ];

  return (
    <TouchableOpacity
      style={cardStyle}
      onPress={onSelect}
      disabled={!strategy.isAvailable}
      activeOpacity={0.75}
    >
      <View style={styles.row}>
        <View style={[styles.iconWrap, { backgroundColor: Colors['colors-lavender-100'], borderRadius: theme.cornerRad['corner-rad-md'] }]}>
          <SvgIcon name={strategy.icon} size={'font-size-xl'} color={'font-highlight'} />
        </View>
        <View style={styles.textWrap}>
          <Text fontSize={'font-size-md'} fontWeight={'semibold'}>
            {strategy.label}
          </Text>
          <Text fontSize={'font-size-sm'} color={'font-light'}>
            {strategy.isAvailable ? strategy.description : 'Próximamente'}
          </Text>
        </View>
        {selected && strategy.isAvailable ? (
          <View style={[styles.check, { backgroundColor: Colors['colors-lavender-500'], borderRadius: 99 }]}>
            <SvgIcon name={'Info'} size={'font-size-sm'} color={'font-invert'} />
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
  },
  row: {
    flexDirection:  'row',
    alignItems:     'center',
    gap:            12,
  },
  iconWrap: {
    width:          44,
    height:         44,
    alignItems:     'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
    gap:  2,
  },
  check: {
    width:          24,
    height:         24,
    alignItems:     'center',
    justifyContent: 'center',
  },
});
