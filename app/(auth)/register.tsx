import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import Input from '@/src/components/ui/Input';
import { createUser, emailIsRegistered, UserRole } from '@/src/data/users';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('client');
  const [error, setError] = useState('');

  function validateForm() {
    if (!name) {
      setError('El nombre es obligatorio');
      return false;
    }

    if (!email.includes('@')) {
      setError('Email inválido');
      return false;
    }

    if (emailIsRegistered(email)) {
      setError('Ya existe una cuenta con ese email');
      return false;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }

    setError('');
    return true;
  }

  function handleRegister() {
    if (!validateForm()) return;

    createUser({
      name,
      email,
      password,
      role,
    });
    router.replace('/login');
  }

  return (
    <View className="flex-1 justify-center bg-background px-6">
      {/* Título */}
      <View className="mb-10 items-center">
        <Image source={require('@/assets/logo_transparente2.png')} className="mb-4 h-40 w-full" />
      </View>
      <View className="mb-6 flex-row justify-between">
        <TouchableOpacity
          className={`mr-2 flex-1 rounded-xl py-3 ${role === 'client' ? 'bg-primary' : 'bg-white'}`}
          onPress={() => setRole('client')}>
          <Text
            className={`text-center font-semibold ${
              role === 'client' ? 'text-background' : 'text-black'
            }`}>
            Cliente
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`mr-2 flex-1 rounded-xl py-3 ${
            role === 'business' ? 'bg-primary' : 'bg-white'
          }`}
          onPress={() => setRole('business')}>
          <Text
            className={`text-center font-semibold ${
              role === 'business' ? 'text-background' : 'text-black'
            }`}>
            Negocio
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 rounded-xl py-3 ${role === 'delivery' ? 'bg-primary' : 'bg-white'}`}
          onPress={() => setRole('delivery')}>
          <Text
            className={`text-center font-semibold ${
              role === 'delivery' ? 'text-background' : 'text-black'
            }`}>
            Repartidor
          </Text>
        </TouchableOpacity>
      </View>
      {/* Nombre */}
      <Input placeholder="Nombre" value={name} onChangeText={setName} />

      {/* Email */}
      <Input placeholder="Email" value={email} onChangeText={setEmail} />

      {/* Password */}
      <Input placeholder="Contraseña" value={password} onChangeText={setPassword} secure />

      {/* Confirm password */}
      <Input
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secure
      />

      {error ? <Text className="mb-4 text-center text-red-500">{error}</Text> : null}

      {/* Botón registro */}
      <TouchableOpacity className="mt-2 rounded-xl bg-primary py-4" onPress={handleRegister}>
        <Text className="text-center text-lg font-bold text-background">Crear cuenta</Text>
      </TouchableOpacity>

      {/* Volver a login */}
      <TouchableOpacity className="mt-6" onPress={() => router.push('/login')}>
        <Text className="text-center font-semibold text-secondary">Ya tengo cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}
