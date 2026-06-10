import { TouchableOpacity, View } from 'react-native';
import { ActionModal, SvgIcon, Text } from '@luvo/ui';
import { useAccountGoogleLink } from './hooks/useAccountGoogleLink';
import { useAccountGoogleLinkTheme } from './theme/useAccountGoogleLinkTheme';

export const AccountGoogleLink = () => {
  const { styles } = useAccountGoogleLinkTheme();
  const {
    isLinked,
    googleEmail,
    isLoading,
    confirmUnlink,
    openConfirmUnlink,
    cancelConfirmUnlink,
    handleLink,
    handleUnlink,
    strings,
  } = useAccountGoogleLink();

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
            {strings.google}
          </Text>
          {isLinked && googleEmail ? (
            <Text fontSize="font-size-md" fontWeight="semibold">
              {googleEmail}
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
