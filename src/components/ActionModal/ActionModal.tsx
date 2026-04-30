import { SvgIcon } from 'components/SvgIcon/SvgIcon';
import { IconName } from 'components/SvgIcon/types';
import { Text } from 'components/Text/Text';
import { Modal, Pressable, TouchableOpacity, View } from 'react-native';
import { useActionModalTheme } from './theme/useActionModalTheme';

export interface ActionModalProps {
  visible: boolean;
  title: string;
  body: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'destructive' | 'neutral';
  icon?: IconName;
}

export const ActionModal = ({
  visible,
  title,
  body,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  variant = 'neutral',
  icon = 'AlertTriangle',
}: ActionModalProps) => {
  const { styles } = useActionModalTheme(variant);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.overlay} onPress={onCancel}>
        <Pressable style={styles.card} onPress={() => {}}>
          <View style={styles.iconContainer}>
            <SvgIcon
              name={icon}
              size="icon-size-xl"
              color={variant === 'destructive' ? 'font-error' : 'font-secondary'}
            />
          </View>

          <Text fontSize="font-size-lg" fontWeight="extrabold" style={styles.title}>
            {title}
          </Text>
          <Text fontSize="font-size-xs" color="font-light" style={styles.body}>
            {body}
          </Text>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm} activeOpacity={0.8}>
              <Text fontSize="font-size-md" fontWeight="bold" color="font-invert">
                {confirmLabel}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel} activeOpacity={0.7}>
              <Text fontSize="font-size-sm" fontWeight="semibold">
                {cancelLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
