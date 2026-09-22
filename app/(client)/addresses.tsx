import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';

export default function AddressesScreen() {
  const [address, setAddress] = useState('Av. Siempre Viva 123');
  const [saved, setSaved] = useState(true);

  const saveAddress = () => {
    if (address.trim()) setSaved(true);
  };

  return (
    <ScrollView className="flex-1 bg-gray-800 p-4" contentContainerStyle={{ paddingBottom: 32 }}>
      <Pressable onPress={() => router.back()} className="mb-6 mt-10">
        <Text className="font-semibold text-orange-400">← Volver al perfil</Text>
      </Pressable>
      <Text className="mb-2 text-3xl font-bold text-white">Direcciones</Text>
      <Text className="mb-6 text-gray-400">Usá una dirección para recibir tus pedidos.</Text>

      {saved && (
        <View className="mb-5 rounded-2xl border border-orange-400 bg-gray-700 p-4">
          <View className="flex-row items-center justify-between">
            <Text className="font-bold text-white">Dirección principal</Text>
            <Text className="text-sm font-semibold text-orange-400">Principal</Text>
          </View>
          <Text className="mt-3 text-gray-200">{address}</Text>
          <Pressable onPress={() => setSaved(false)} className="mt-4 self-start">
            <Text className="font-semibold text-red-400">Eliminar dirección</Text>
          </Pressable>
        </View>
      )}

      <Text className="mb-2 font-semibold text-white">Agregar o editar dirección</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Ej: Av. Siempre Viva 123"
        placeholderTextColor="#94a3b8"
        className="rounded-xl bg-white p-4 text-gray-900"
      />
      <Pressable onPress={saveAddress} className="mt-4 items-center rounded-xl bg-orange-500 p-4">
        <Text className="font-bold text-white">
          {saved ? 'Guardar cambios' : 'Agregar dirección'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}
