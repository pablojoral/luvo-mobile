import { AuthModeToggle, Button, SocialAuth, SvgImage, Text, TextInput } from '@luvo/ui';
import { RootStackParamList } from 'navigation/RootStackNavigator';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAuthScreen } from './hooks/useAuthScreen';
import { useAuthTheme } from './theme/useAuthTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export const Auth = ({ route, navigation }: Props) => {
  const { styles } = useAuthTheme();
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
    mode,
    heading,
    subtitle,
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
  } = useAuthScreen(route.params?.mode ?? 'login', navigation);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.avoidingView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView bounces={false} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContent}>
          <Pressable onPress={Keyboard.dismiss} style={styles.content}>
            <View style={styles.logoRow}>
              <SvgImage name="luvo-logo-pink" height={34} width={32} />
              <Text fontSize="font-size-xxxl" color="font-highlight" fontWeight="bold">luvo</Text>
            </View>
            <Animated.View key={mode} entering={FadeInDown.duration(280).springify()}>
              <View style={styles.headingSection}>
                <Text fontSize="font-size-xxxxl" fontWeight="extrabold">{heading}</Text>
                <Text fontSize="font-size-md" color="font-light">{subtitle}</Text>
              </View>
            </Animated.View>
            <Animated.View entering={FadeIn.duration(200)} style={styles.formSection}>
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
              <TouchableOpacity style={styles.forgotPasswordRow} onPress={handleForgotPassword} disabled={isLoading}>
                <Text fontSize="font-size-sm" color="font-highlight" fontWeight="semibold">
                  {forgotPasswordLabel}
                </Text>
              </TouchableOpacity>
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
            </Animated.View>
          </Pressable>
          <View style={styles.footer}>
            <Button fullWidth label={submitLabel} onPress={onSubmit} disabled={isLoading} submitting={isSubmitting} />
            <SocialAuth
              onSignIn={handleSocialSignIn}
              disabled={isLoading}
              submitting={isSocialSubmitting}
              showApple={showApple}
              error={socialError ?? undefined}
              dividerLabel={socialDividerLabel}
              googleLabel={googleSignInLabel}
              appleLabel={appleSignInLabel}
            />
            <AuthModeToggle
              promptLabel={mode === 'login' ? signUpPromptLabel : signInPromptLabel}
              linkLabel={mode === 'login' ? signUpLinkLabel : signInLinkLabel}
              onPress={handleToggleMode}
              disabled={isLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
