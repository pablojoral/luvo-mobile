import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { IconName } from 'components/SvgIcon/types';
import { Switch } from 'components/Switch/Switch';
import { Text } from 'components/Text/Text';
import { TouchableOpacity, View } from 'react-native';
import { useSettingsTheme } from 'features/Settings/theme/useSettingsTheme';

type SettingsRowProps = {
  icon: IconName;
  label: string;
  description?: string;
  readonly?: boolean;
} & (
  | { type: 'toggle'; value: boolean; onToggle: (value: boolean) => void }
  | { type: 'value'; value: string; onPress: () => void }
  | { type: 'navigate'; onPress: () => void }
);

export const SettingsRow = (props: SettingsRowProps) => {
  const { styles } = useSettingsTheme();
  const { icon, label, description, readonly } = props;

  const inner = (
    <>
      <SvgIcon name={icon} size="icon-size-lg" color="font-primary" />

      <View style={styles.rowContent}>
        <Text fontSize="font-size-md" fontWeight="semibold">
          {label}
        </Text>
        {description ? (
          <Text fontSize="font-size-xs" color="font-placeholder">
            {description}
          </Text>
        ) : null}
      </View>

      <View style={styles.rowRight}>
        {props.type === 'toggle' ? (
          <Switch value={props.value} onValueChange={props.onToggle} />
        ) : props.type === 'navigate' ? (
          <SvgIcon name="ChevronRight" size="icon-size-sm" color="font-light" />
        ) : (
          <>
            <Text fontSize="font-size-sm" color="font-placeholder">
              {props.value}
            </Text>
            {!readonly ? (
              <SvgIcon name="ChevronRight" size="icon-size-sm" color="font-light" />
            ) : null}
          </>
        )}
      </View>
    </>
  );

  if (props.type === 'toggle') {
    return <View style={styles.rowCard}>{inner}</View>;
  }

  if (props.type === 'value' && readonly) {
    return <View style={styles.rowCard}>{inner}</View>;
  }

  return (
    <TouchableOpacity style={styles.rowCard} onPress={props.onPress} activeOpacity={0.7}>
      {inner}
    </TouchableOpacity>
  );
};
