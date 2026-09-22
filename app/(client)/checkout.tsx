import { useContext, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { CartContext } from '@/src/context/CartContext';

export default function CheckoutScreen() {
  const cartContext = useContext(CartContext);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Efectivo');
  const [error, setError] = useState('');

  if (!cartContext?.cart.length) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-800 p-6">
        <Text className="mb-4 text-center text-xl font-bold text-white">
          No hay productos para confirmar
        </Text>
        <Pressable
          onPress={() => router.replace('/(client)/(tabs)/home')}
          className="rounded-xl bg-orange-500 px-5 py-3">
          <Text className="font-bold text-white">Volver al inicio</Text>
        </Pressable>
      </View>
    );
  }

  const total = cartContext.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const handleConfirm = () => {
    if (!address.trim()) {
      setError('Ingresá una dirección de entrega.');
      return;
    }
    const order = cartContext.placeOrder({ address: address.trim(), paymentMethod });
    if (order) router.replace(`/order-tracking?id=${order.id}`);
  };

  return (
    <ScrollView className="flex-1 bg-gray-800 p-4" contentContainerStyle={{ paddingBottom: 32 }}>
      <Pressable onPress={() => router.back()} className="mb-4 mt-10">
        <Text className="font-semibold text-orange-500">← Volver al carrito</Text>
      </Pressable>
      <Text className="mb-6 text-3xl font-bold text-white">Confirmar pedido</Text>
      <Text className="mb-2 font-semibold text-white">Dirección de entrega</Text>
      <TextInput
        value={address}
        onChangeText={(value) => {
          setAddress(value);
          setError('');
        }}
        placeholder="Ej: Av. Siempre Viva 123"
        placeholderTextColor="#9ca3af"
        className="mb-2 rounded-xl bg-white p-4 text-gray-900"
      />
      {!!error && <Text className="mb-4 text-red-400">{error}</Text>}
      <Text className="mb-2 mt-4 font-semibold text-white">Método de pago</Text>
      <View className="mb-6 flex-row gap-3">
        {['Efectivo', 'Tarjeta'].map((method) => (
          <Pressable
            key={method}
            onPress={() => setPaymentMethod(method)}
            className={`rounded-xl px-5 py-3 ${paymentMethod === method ? 'bg-orange-500' : 'bg-gray-700'}`}>
            <Text className="font-semibold text-white">{method}</Text>
          </Pressable>
        ))}
      </View>
      <View className="mb-6 rounded-xl bg-gray-700 p-4">
        <Text className="mb-3 text-lg font-bold text-white">Resumen</Text>
        {cartContext.cart.map((item) => (
          <View key={item.product.id} className="mb-2 flex-row justify-between">
            <Text className="flex-1 text-gray-200">
              {item.quantity} × {item.product.name}
            </Text>
            <Text className="text-white">${(item.product.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}
        <View className="mt-2 border-t border-gray-600 pt-3">
          <Text className="text-right text-xl font-bold text-white">
            Total: ${total.toFixed(2)}
          </Text>
        </View>
      </View>
      <Pressable onPress={handleConfirm} className="items-center rounded-xl bg-orange-500 p-4">
        <Text className="text-lg font-bold text-white">Confirmar pedido</Text>
      </Pressable>
    </ScrollView>
  );
}
