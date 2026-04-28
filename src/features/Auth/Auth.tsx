import { Button } from 'components/Button/Button';
import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';
import { SvgImage } from 'components/SvgImage/SvgImage';
import { Text } from 'components/Text/Text';
import { TextInput } from 'components/TextInput/TextInput';
import { useKeyboardVisible } from 'hooks/useKeyboardVisible';
import { RootStackParamList } from 'navigation/RootStackNavigator';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
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
    onSubmit,
    emailRules,
    passwordRules,
    title,
    emailLabel,
    emailPlaceholder,
    passwordLabel,
    passwordPlaceholder,
    submitLabel,
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
                />
              )}
            />
            {errors.root && (
              <Text fontSize="font-size-xs" color="font-error" style={styles.errorText}>
                {errors.root.message}
              </Text>
            )}
          </Pressable>
        </ScrollView>
        <View style={styles.footer}>
          <Button fullWidth label={submitLabel} onPress={onSubmit} disabled={isSubmitting} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
