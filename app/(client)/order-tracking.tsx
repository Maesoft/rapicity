import { useContext } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { CartContext, OrderStatus } from '@/src/context/CartContext';

const steps: { status: OrderStatus; label: string }[] = [
  { status: 'received', label: 'Pedido recibido' },
  { status: 'preparing', label: 'En preparación' },
  { status: 'on_the_way', label: 'En camino' },
  { status: 'delivered', label: 'Entregado' },
];

export default function OrderTrackingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const order = useContext(CartContext)?.orders.find((item) => item.id === id);

  if (!order) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-800 p-6">
        <Text className="mb-4 text-xl font-bold text-white">No encontramos ese pedido</Text>
        <Pressable
          onPress={() => router.replace('/(client)/(tabs)/orders')}
          className="rounded-xl bg-orange-500 px-5 py-3">
          <Text className="font-bold text-white">Ver mis pedidos</Text>
        </Pressable>
      </View>
    );
  }

  const currentStep = steps.findIndex((step) => step.status === order.status);
  return (
    <View className="flex-1 bg-gray-800 p-4">
      <Pressable onPress={() => router.back()} className="mb-6 mt-10">
        <Text className="font-semibold text-orange-500">← Volver</Text>
      </Pressable>
      <Text className="text-3xl font-bold text-white">Pedido {order.id}</Text>
      <Text className="mb-6 mt-2 text-gray-400">{order.address}</Text>
      <View className="mb-6 rounded-2xl bg-gray-700 p-5">
        <Text className="mb-5 text-xl font-bold text-white">Estado del pedido</Text>
        {steps.map((step, index) => (
          <View key={step.status} className="mb-4 flex-row items-center">
            <View
              className={`mr-3 h-4 w-4 rounded-full ${index <= currentStep ? 'bg-orange-500' : 'bg-gray-500'}`}
            />
            <Text className={index <= currentStep ? 'font-bold text-white' : 'text-gray-400'}>
              {step.label}
            </Text>
          </View>
        ))}
      </View>
      <View className="rounded-2xl bg-gray-700 p-5">
        <Text className="mb-3 text-lg font-bold text-white">Resumen</Text>
        {order.items.map((item) => (
          <Text key={item.product.id} className="mb-2 text-gray-200">
            {item.quantity} × {item.product.name}
          </Text>
        ))}
        <Text className="mt-2 text-xl font-bold text-white">Total: ${order.total.toFixed(2)}</Text>
        <Text className="mt-1 text-gray-400">Pago: {order.paymentMethod}</Text>
      </View>
      <View
        className="mt-auto flex-row gap-3 pb-4 pt-6"
        style={{ transform: [{ translateY: -10 }] }}>
        <Pressable
          onPress={() =>
            Alert.alert(
              '¿Tuviste un problema?',
              'La asistencia estará disponible próximamente. Podés comunicarte con soporte para recibir ayuda.'
            )
          }
          className="flex-1 items-center rounded-xl border border-red-400 px-4 py-3">
          <Text className="text-center font-bold text-red-400">Tuve un problema</Text>
        </Pressable>
        <Pressable
          onPress={() => router.replace('/(client)/(tabs)/orders')}
          className="flex-1 items-center rounded-xl bg-orange-500 px-4 py-3">
          <Text className="font-bold text-white">Cerrar</Text>
        </Pressable>
      </View>
    </View>
  );
}
