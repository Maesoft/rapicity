import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';

export default function PaymentMethodsScreen() {
  const [cardNumber, setCardNumber] = useState('');
  const [savedCard, setSavedCard] = useState('**** **** **** 4242');

  const saveCard = () => {
    const digits = cardNumber.replace(/\D/g, '');
    if (digits.length >= 4) {
      setSavedCard(`**** **** **** ${digits.slice(-4)}`);
      setCardNumber('');
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-800 p-4" contentContainerStyle={{ paddingBottom: 32 }}>
      <Pressable onPress={() => router.back()} className="mb-6 mt-10">
        <Text className="font-semibold text-orange-400">← Volver al perfil</Text>
      </Pressable>
      <Text className="mb-2 text-3xl font-bold text-white">Métodos de pago</Text>
      <Text className="mb-6 text-gray-400">Administrá cómo pagar tus pedidos.</Text>

      <View className="mb-5 rounded-2xl border border-orange-400 bg-gray-700 p-4">
        <View className="flex-row items-center justify-between">
          <Text className="font-bold text-white">Tarjeta guardada</Text>
          <Text className="text-2xl text-orange-400">▣</Text>
        </View>
        <Text className="mt-4 text-lg tracking-widest text-gray-200">{savedCard}</Text>
        <Pressable onPress={() => setSavedCard('')} className="mt-4 self-start">
          <Text className="font-semibold text-red-400">Eliminar tarjeta</Text>
        </Pressable>
      </View>

      <Text className="mb-2 font-semibold text-white">Agregar tarjeta</Text>
      <TextInput
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="number-pad"
        placeholder="Número de tarjeta"
        placeholderTextColor="#94a3b8"
        className="rounded-xl bg-white p-4 text-gray-900"
      />
      <Pressable onPress={saveCard} className="mt-4 items-center rounded-xl bg-orange-500 p-4">
        <Text className="font-bold text-white">Guardar tarjeta</Text>
      </Pressable>
    </ScrollView>
  );
}
