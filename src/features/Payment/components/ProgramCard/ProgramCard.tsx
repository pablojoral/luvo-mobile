import { SvgIcon, Text } from '@luvo/ui';
import { TouchableOpacity, View } from 'react-native';

import { CoinCost, Program } from 'models/models';
import { useProgramCardTheme } from './theme/useProgramCardTheme';
import { useProgramCard } from './hooks/useProgramCard';

interface ProgramCardProps {
  program:   Program;
  coinCosts: CoinCost[];
  selected:  boolean;
  onSelect:  () => void;
}

export const ProgramCard = ({ program, coinCosts, selected, onSelect }: ProgramCardProps) => {
  const { styles, cardStyle } = useProgramCardTheme({ selected });
  const { label, subtitle }   = useProgramCard({ program, coinCosts });

  return (
    <TouchableOpacity style={cardStyle} onPress={onSelect} activeOpacity={0.75}>
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <SvgIcon name={'Settings'} size={'icon-size-md'} color={'font-highlight'} />
        </View>
        <View style={styles.textWrap}>
          <Text fontSize={'font-size-md'} fontWeight={'semibold'}>
            {label}
          </Text>
          <Text fontSize={'font-size-sm'} color={'font-light'}>
            {subtitle}
          </Text>
        </View>
        {selected && (
          <View style={styles.check}>
            <SvgIcon name={'Info'} size={'icon-size-xs'} color={'font-invert'} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
