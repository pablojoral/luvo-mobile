import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { IconName } from 'components/SvgIcon/types';
import { Text } from 'components/Text/Text';
import { Switch, TouchableOpacity, View } from 'react-native';
import { useSettingsTheme } from 'features/Settings/theme/useSettingsTheme';
import { useTheme } from 'theme/hooks/useTheme';

type SettingsRowProps = {
  icon: IconName;
  label: string;
  description?: string;
  readonly?: boolean;
} & (
  | { type: 'toggle'; value: boolean; onToggle: (value: boolean) => void }
  | { type: 'value'; value: string; onPress: () => void }
);

export const SettingsRow = (props: SettingsRowProps) => {
  const { styles } = useSettingsTheme();
  const theme = useTheme();
  const { icon, label, description, readonly } = props;

  const inner = (
    <>
      <View style={styles.rowIcon}>
        <SvgIcon name={icon} size="font-size-xl" color="font-secondary" />
      </View>

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
          <Switch
            value={props.value}
            onValueChange={props.onToggle}
            trackColor={{
              false: theme.borderColor['border-primary'],
              true: theme.surfaceColor['surface-invert'],
            }}
          />
        ) : (
          <>
            <Text fontSize="font-size-sm" color="font-placeholder">
              {props.value}
            </Text>
            {!readonly ? (
              <SvgIcon name="ChevronRight" size="font-size-lg" color="font-light" />
            ) : null}
          </>
        )}
      </View>
    </>
  );

  if (props.type === 'toggle') {
    return <View style={styles.row}>{inner}</View>;
  }

  if (readonly) {
    return <View style={styles.row}>{inner}</View>;
  }

  return (
    <TouchableOpacity style={styles.row} onPress={props.onPress} activeOpacity={0.7}>
      {inner}
    </TouchableOpacity>
  );
};
