import { View, Text, TouchableOpacity, Image } from 'react-native';
import Button from '@/src/components/ui/Button';
import Input from '@/src/components/ui/Input';
import { useState } from 'react';
import { router } from 'expo-router';
import { findUserByCredentials } from '@/src/data/users';
import { useAuth } from '@/src/context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  function handleLogin() {
    const user = findUserByCredentials(email, password);

    if (!user) {
      setError('Email o contraseña incorrectos');
      return;
    }

    setError('');
    signIn(user);
    router.replace('/(client)/(tabs)/home');
  }

  return (
    <View className="flex-1 justify-center bg-background px-6">
      {/* Logo / Nombre */}
      <View className="mb-8 items-center">
        <Image source={require('@/assets/logo_transparente2.png')} className="mb-8 h-40 w-full" />
      </View>

      {/* Email */}
      <Input placeholder="Email" value={email} onChangeText={setEmail} />

      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={(value) => {
          setPassword(value);
          setError('');
        }}
        secure
      />

      <Button title="Iniciar sesión" onPress={handleLogin} />

      {error ? <Text className="mb-4 text-center text-red-500">{error}</Text> : null}

      {/* Register */}
      <TouchableOpacity
        onPress={() => router.push('/register')}
        className="rounded-xl bg-gray-800 py-4">
        <Text className="text-center text-lg font-bold text-white">Crear cuenta</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View className="my-8 flex-row items-center">
        <View className="h-[1px] flex-1 bg-gray-400" />
        <Text className="mx-4 text-gray-300">o</Text>
        <View className="h-[1px] flex-1 bg-gray-400" />
      </View>

      {/* Google login */}
      <TouchableOpacity className="rounded-xl bg-white py-4">
        <Text className="text-center font-semibold">Continuar con Google</Text>
      </TouchableOpacity>
    </View>
  );
}
