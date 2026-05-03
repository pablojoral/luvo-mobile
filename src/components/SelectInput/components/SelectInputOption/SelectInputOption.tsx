import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Text } from 'components/Text/Text';
import { Pressable } from 'react-native';
import { SelectorOption } from 'components/PillSelector/PillSelector';

import { useSelectInputOptionTheme } from './theme/useSelectInputOptionTheme';

interface SelectInputOptionProps {
  option: SelectorOption;
  selected: boolean;
  isLast: boolean;
  onPress: () => void;
}

export const SelectInputOption = ({ option, selected, isLast, onPress }: SelectInputOptionProps) => {
  const { containerStyle } = useSelectInputOptionTheme(selected, isLast);

  return (
    <Pressable style={containerStyle} onPress={onPress}>
      <Text
        fontSize="font-size-sm"
        color={selected ? 'font-primary' : 'font-secondary'}
        fontWeight={selected ? 'semibold' : 'regular'}
      >
        {option.label}
      </Text>
      {selected && <SvgIcon name="Check" size="icon-size-sm" color="font-highlight" />}
    </Pressable>
  );
};
