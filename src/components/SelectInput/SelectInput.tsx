import { SelectorOption } from 'components/PillSelector/PillSelector';
import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Text } from 'components/Text/Text';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useSelectInput } from './hooks/useSelectInput';
import { useSelectInputTheme } from './theme/useSelectInputTheme';

export interface SelectInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  options: SelectorOption[];
  onChange: (value: string) => void;
  error?: string;
}

export const SelectInput = ({ label, placeholder, value, options, onChange, error }: SelectInputProps) => {
  const { styles } = useSelectInputTheme({ error: !!error });
  const { isOpen, toggle, select, selectedLabel, chevronStyle } = useSelectInput({ value, options, onChange });

  return (
    <View style={styles.container}>
      {label && (
        <Text fontSize="font-size-sm" fontWeight="semibold">
          {label}
        </Text>
      )}
      <Pressable style={styles.trigger} onPress={toggle}>
        <Text
          fontSize="font-size-md"
          color={selectedLabel ? 'font-primary' : 'font-placeholder'}
        >
          {selectedLabel ?? placeholder ?? 'Seleccionar...'}
        </Text>
        <Animated.View style={chevronStyle}>
          <SvgIcon name="ChevronRight" size="icon-size-md" color="font-secondary" />
        </Animated.View>
      </Pressable>
      {isOpen && (
        <View style={styles.optionsList}>
          {options.map((option, idx) => (
            <Pressable
              key={option.value}
              style={[
                styles.option,
                idx === options.length - 1 && styles.optionLast,
                value === option.value && styles.optionSelected,
              ]}
              onPress={() => select(option.value)}
            >
              <Text
                fontSize="font-size-sm"
                color={value === option.value ? 'font-primary' : 'font-secondary'}
                fontWeight={value === option.value ? 'semibold' : 'regular'}
              >
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
      {error && (
        <View style={styles.footer}>
          <Text fontSize="font-size-xs" color="font-error">
            {error}
          </Text>
        </View>
      )}
    </View>
  );
};
