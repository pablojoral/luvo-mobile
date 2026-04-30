import { Button } from 'components/Button/Button';
import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';
import { SvgImage } from 'components/SvgImage/SvgImage';
import { Text } from 'components/Text/Text';
import { TextInput } from 'components/TextInput/TextInput';
import { useKeyboardVisible } from 'hooks/useKeyboardVisible';
import { RootStackParamList } from 'navigation/RootStackNavigator';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, SlideOutUp } from 'react-native-reanimated';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAuthScreen } from './hooks/useAuthScreen';
import { useAuthTheme } from './theme/useAuthTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export const Auth = ({ route, navigation }: Props) => {
  const mode = route.params?.mode ?? 'login';
  const { styles } = useAuthTheme();
  const isKeyboardVisible = useKeyboardVisible();
  const {
    control,
    errors,
    isSubmitting,
    isLoading,
    onSubmit,
    emailRules,
    passwordRules,
    handleForgotPassword,
    forgotPasswordSent,
    handleSocialSignIn,
    socialError,
    isSocialSubmitting,
    showApple,
    handleToggleMode,
    title,
    emailLabel,
    emailPlaceholder,
    passwordLabel,
    passwordPlaceholder,
    submitLabel,
    forgotPasswordLabel,
    forgotPasswordSuccessLabel,
    socialDividerLabel,
    googleSignInLabel,
    appleSignInLabel,
    signUpPromptLabel,
    signUpLinkLabel,
    signInPromptLabel,
    signInLinkLabel,
  } = useAuthScreen(mode, navigation);

  return (
    <View style={styles.container}>
      <ScreenHeader title={title} onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView style={styles.avoidingView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView bounces={false} keyboardShouldPersistTaps="handled">
          <Pressable onPress={Keyboard.dismiss} style={styles.content}>
            {!isKeyboardVisible && (
              <Animated.View
                style={styles.logoContainer}
                entering={FadeIn.duration(200)}
                exiting={SlideOutUp.duration(200)}
              >
                <SvgImage name="luvo-logo-pink" height={128} width={128} />
              </Animated.View>
            )}
            <Controller
              control={control}
              name="email"
              rules={emailRules}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label={emailLabel}
                  placeholder={emailPlaceholder}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.email?.message}
                  editable={!isLoading}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={passwordRules}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label={passwordLabel}
                  placeholder={passwordPlaceholder}
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.password?.message}
                  editable={!isLoading}
                />
              )}
            />
            {mode === 'login' && (
              <View style={styles.forgotPasswordRow}>
                <Button
                  variant="link"
                  label={forgotPasswordLabel}
                  onPress={handleForgotPassword}
                  disabled={isLoading}
                />
              </View>
            )}
            {forgotPasswordSent && (
              <Text fontSize="font-size-xs" color="font-success" style={styles.forgotPasswordSuccessText}>
                {forgotPasswordSuccessLabel}
              </Text>
            )}
            {errors.root && (
              <Text fontSize="font-size-xs" color="font-error" style={styles.errorText}>
                {errors.root.message}
              </Text>
            )}
            {socialError && (
              <Text fontSize="font-size-xs" color="font-error" style={styles.errorText}>
                {socialError}
              </Text>
            )}
          </Pressable>
        </ScrollView>
        <View style={styles.footer}>
          <Button fullWidth label={submitLabel} onPress={onSubmit} disabled={isLoading} submitting={isSubmitting} />
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text fontSize="font-size-xs" color="font-secondary">
              {socialDividerLabel}
            </Text>
            <View style={styles.dividerLine} />
          </View>
          <View style={styles.socialButtonsRow}>
            <Button
              fullWidth
              variant="secondary"
              label={googleSignInLabel}
              onPress={() => handleSocialSignIn('google')}
              disabled={isLoading}
              submitting={isSocialSubmitting}
            />
            {showApple && (
              <Button
                fullWidth
                variant="secondary"
                label={appleSignInLabel}
                onPress={() => handleSocialSignIn('apple')}
                disabled={isLoading}
                submitting={isSocialSubmitting}
              />
            )}
          </View>
          <TouchableOpacity
            style={styles.modeToggleRow}
            onPress={handleToggleMode}
            disabled={isLoading}
            accessibilityLabel={mode === 'login' ? signUpLinkLabel : signInLinkLabel}
            accessibilityRole="button"
          >
            <Text fontSize="font-size-sm" color="font-secondary">
              {mode === 'login' ? signUpPromptLabel : signInPromptLabel}
            </Text>
            <Text fontSize="font-size-sm" color="font-highlight" fontWeight="semibold">
              {mode === 'login' ? signUpLinkLabel : signInLinkLabel}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
