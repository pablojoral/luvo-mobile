import { RouteProp, useRoute } from '@react-navigation/native';
import { Button } from 'components/Button/Button';
import { ScreenHeader } from 'components/ScreenHeader/ScreenHeader';
import { Text } from 'components/Text/Text';
import { RootStackParamList } from 'navigation/RootStackNavigator';
import { useRootStackNavigation } from 'navigation/RootStackNavigator/hooks/useRootStackNavigation';
import { useFirebaseAuthState } from 'query/Auth/useAuth';
import { useRegisterMyLaundry } from 'query/MyLaundries/useRegisterMyLaundry';
import React from 'react';
import { View } from 'react-native';
import { useLaundryRegistrationTheme } from './theme/useLaundryRegistrationTheme';

export const LaundryRegistration = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'RegisterLaundry'>>();
  const navigation = useRootStackNavigation();
  const { code } = route.params;
  const { styles } = useLaundryRegistrationTheme();

  const { data: firebaseUser, isLoading: authLoading } = useFirebaseAuthState();
  const { mutate: register, isPending, isError, reset } = useRegisterMyLaundry();

  const handleRegister = () => {
    reset();
    register(code, {
      onSuccess: () => navigation.goBack(),
    });
  };

  if (!authLoading && !firebaseUser) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Agregar lavandería" onBack={() => navigation.goBack()} />
        <View style={styles.guestContainer}>
          <Text fontSize="font-size-md" color="font-secondary" style={{ textAlign: 'center' }}>
            Inicia sesión para agregar esta lavandería a tu lista
          </Text>
          <Button
            label="Iniciar sesión"
            fullWidth
            onPress={() => {
              navigation.goBack();
              navigation.navigate('Auth');
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Agregar lavandería" onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <View style={styles.codeCard}>
          <Text fontSize="font-size-sm" color="font-placeholder">
            Código de acceso
          </Text>
          <Text fontSize="font-size-xxl" fontWeight="semibold" color="font-primary">
            {code}
          </Text>
        </View>

        <Text fontSize="font-size-sm" color="font-placeholder" style={styles.errorText}>
          Agrega esta lavandería privada a tu lista para ver sus máquinas disponibles
        </Text>

        {isError ? (
          <Text fontSize="font-size-sm" color="font-error" style={styles.errorText}>
            Código inválido o expirado. Verifica el código e inténtalo de nuevo.
          </Text>
        ) : null}

        <Button
          label="Agregar lavandería"
          fullWidth
          submitting={isPending}
          onPress={handleRegister}
        />
      </View>
    </View>
  );
};
