import { BottomSheet } from 'components/BottomSheet/BottomSheet';
import { SelectorOption } from 'components/PillSelector/PillSelector';
import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { Text } from 'components/Text/Text';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { SelectInputOption } from './components/SelectInputOption/SelectInputOption';

import { useSelectInput } from './hooks/useSelectInput';
import { useSelectInputTheme } from './theme/useSelectInputTheme';

export interface SelectInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  options: SelectorOption[];
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export const SelectInput = ({ label, placeholder, value, options, onChange, error, disabled }: SelectInputProps) => {
  const { styles } = useSelectInputTheme({ error: !!error, disabled });
  const { modalVisible, showModal, hideModal, select, selectedLabel, chevronStyle } = useSelectInput({ value, options, onChange });

  return (
    <View style={styles.container}>
      {label && (
        <Text fontSize="font-size-sm" fontWeight="semibold">
          {label}
        </Text>
      )}
      <Pressable style={styles.trigger} onPress={disabled ? undefined : showModal}>
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

      <BottomSheet visible={modalVisible} onClose={hideModal} title={label}>
        <View style={styles.optionsList}>
          {options.map((option, idx) => (
            <SelectInputOption
              key={option.value}
              option={option}
              selected={value === option.value}
              isLast={idx === options.length - 1}
              onPress={() => select(option.value)}
            />
          ))}
        </View>
      </BottomSheet>

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
