import { Button } from 'components/Button/Button';
import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';
import { Text } from 'components/Text/Text';
import React from 'react';
import { View } from 'react-native';
import { useLaundryRegistrationScreen } from './hooks/useLaundryRegistrationScreen';
import { useLaundryRegistrationTheme } from './theme/useLaundryRegistrationTheme';

export const LaundryRegistration = () => {
  const { styles } = useLaundryRegistrationTheme();
  const {
    title,
    guestPrompt,
    signInLabel,
    accessCodeLabel,
    description,
    invalidCode,
    addButton,
    code,
    firebaseUser,
    authLoading,
    isPending,
    isError,
    handleRegister,
    handleGoBack,
    handleSignIn,
  } = useLaundryRegistrationScreen();

  if (!authLoading && !firebaseUser) {
    return (
      <View style={styles.container}>
        <ScreenHeader title={title} onBack={handleGoBack} />
        <View style={styles.guestContainer}>
          <Text fontSize="font-size-md" color="font-secondary" style={styles.guestText}>
            {guestPrompt}
          </Text>
          <Button label={signInLabel} fullWidth onPress={handleSignIn} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title={title} onBack={handleGoBack} />

      <View style={styles.content}>
        <View style={styles.codeCard}>
          <Text fontSize="font-size-sm" color="font-placeholder">
            {accessCodeLabel}
          </Text>
          <Text fontSize="font-size-xxl" fontWeight="semibold" color="font-primary">
            {code}
          </Text>
        </View>

        <Text fontSize="font-size-sm" color="font-placeholder" style={styles.errorText}>
          {description}
        </Text>

        {isError ? (
          <Text fontSize="font-size-sm" color="font-error" style={styles.errorText}>
            {invalidCode}
          </Text>
        ) : null}

        <Button label={addButton} fullWidth submitting={isPending} onPress={handleRegister} />
      </View>
    </View>
  );
};
