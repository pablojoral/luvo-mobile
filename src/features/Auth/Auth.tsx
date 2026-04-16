import { Button } from 'components/Button/Button';
import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';
import { SvgImage } from 'components/SvgImage/SvgImage';
import { Text } from 'components/Text/Text';
import { TextInput } from 'components/TextInput/TextInput';
import { useKeyboardVisible } from 'hooks/useKeyboardVisible';
import { RootStackParamList } from 'navigation/RootStackNavigator';
import { useFirebaseAuthState } from 'query/Auth/useAuth';
import React from 'react';
import { Controller } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAuthForm } from './hooks/useAuthForm';
// import { useSocialAuth } from './hooks/useSocialAuth';
import { useAuthTheme } from './theme/useAuthTheme';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideInUp, SlideOutUp } from 'react-native-reanimated';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export const Auth = ({ route, navigation }: Props) => {
  const mode = route.params?.mode ?? 'login';

  const { data: firebaseUser } = useFirebaseAuthState();
  const { styles } = useAuthTheme();
  const isKeyboardVisible = useKeyboardVisible();

  const { control, errors, isSubmitting, onSubmit } = useAuthForm(mode);
  // const { handleSocialSignIn, error: socialError, isSubmitting: socialSubmitting, showApple } = useSocialAuth();
  const socialSubmitting = false;

  React.useEffect(() => {
    if (firebaseUser) navigation.goBack();
  }, [firebaseUser, navigation]);

  return (
    <View style={styles.container}>
      <ScreenHeader title={'Autenticación'} onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView style={styles.avoidingView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            {!isKeyboardVisible && (
              <Animated.View
                style={styles.headerContainer}
                entering={FadeIn.duration(200)}
                exiting={SlideOutUp.duration(200)}
              >
                <SvgImage name={'luvo-logo-pink'} height={128} width={128} />
              </Animated.View>
            )}
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: 'El email es obligatorio',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Email inválido' },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Email"
                    error={errors.email?.message}
                    placeholder="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                rules={{
                  required: 'La contraseña es obligatoria',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Contraseña"
                    error={errors.password?.message}
                    placeholder="Contraseña"
                    secureTextEntry
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />

              {errors.root && (
                <Text fontSize="font-size-xs" color="font-error" style={styles.errorText}>
                  {errors.root.message}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.menuContainer}>
            <Button fullWidth onPress={onSubmit} disabled={isSubmitting || socialSubmitting} label="Iniciar Sesión" />

            {/* <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text fontSize="font-size-xs" color="font-light">
              o continuar con
            </Text>
            <View style={styles.dividerLine} />
          </View>

          <Button
            fullWidth
            variant="secondary"
            onPress={() => handleSocialSignIn('google')}
            disabled={isSubmitting || socialSubmitting}
            label="Google"
          />
          {showApple && (
            <Button
              fullWidth
              variant="secondary"
              onPress={() => handleSocialSignIn('apple')}
              disabled={isSubmitting || socialSubmitting}
              label="Apple"
            />
          )}

          {socialError && (
            <Text fontSize="font-size-xs" color="font-error">
              {socialError}
            </Text>
          )} */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
