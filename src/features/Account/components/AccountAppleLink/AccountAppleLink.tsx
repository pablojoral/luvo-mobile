import { TouchableOpacity, View } from 'react-native';
import { ActionModal, SvgIcon, Text } from '@luvo/ui';
import { useAccountAppleLink } from './hooks/useAccountAppleLink';
import { useAccountAppleLinkTheme } from './theme/useAccountAppleLinkTheme';

export const AccountAppleLink = () => {
  const { styles } = useAccountAppleLinkTheme();
  const {
    isLinked,
    appleEmail,
    isLoading,
    confirmUnlink,
    openConfirmUnlink,
    cancelConfirmUnlink,
    handleLink,
    handleUnlink,
    strings,
  } = useAccountAppleLink();

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={isLinked ? openConfirmUnlink : handleLink}
        activeOpacity={0.7}
        disabled={isLoading}
      >
        <View style={styles.textColumn}>
          <Text fontSize="font-size-xs" fontWeight="semibold" color="font-light">
            {strings.apple}
          </Text>
          {isLinked && appleEmail ? (
            <Text fontSize="font-size-md" fontWeight="semibold">
              {appleEmail}
            </Text>
          ) : null}
        </View>

        {isLinked ? (
          <View style={styles.linkedBadge}>
            <SvgIcon name="Check" size="icon-size-sm" color="font-success" />
            <Text fontSize="font-size-xs" fontWeight="semibold" color="font-success">
              {strings.linked}
            </Text>
          </View>
        ) : (
          <SvgIcon name="PlusCircle" size="icon-size-sm" color="font-primary" />
        )}
      </TouchableOpacity>

      <ActionModal
        visible={confirmUnlink}
        title={strings.unlinkTitle}
        body={strings.unlinkBody}
        confirmLabel={strings.unlinkConfirm}
        cancelLabel={strings.unlinkCancel}
        onConfirm={handleUnlink}
        onCancel={cancelConfirmUnlink}
      />
    </>
  );
};
