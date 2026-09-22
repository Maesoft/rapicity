import { useContext } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { CartContext, OrderStatus } from '@/src/context/CartContext';

const statusLabels: Record<OrderStatus, string> = {
  received: 'Recibido',
  preparing: 'En preparación',
  on_the_way: 'En camino',
  delivered: 'Entregado',
};

export default function OrdersScreen() {
  const cartContext = useContext(CartContext);
  const orders = cartContext?.orders ?? [];

  if (!orders.length) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-800 p-6">
        <Text className="mb-2 text-2xl font-bold text-white">Todavía no tenés pedidos</Text>
        <Text className="text-center text-gray-400">Tus pedidos confirmados aparecerán acá.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-800 p-4">
      <Text className="mb-5 mt-10 text-3xl font-bold text-white">Mis pedidos</Text>
      <FlatList
        data={orders}
        keyExtractor={(order) => order.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/order-tracking?id=${item.id}`)}
            className="mb-3 rounded-2xl bg-gray-700 p-4">
            <View className="flex-row justify-between">
              <Text className="font-bold text-white">Pedido {item.id}</Text>
              <Text className="font-semibold text-orange-400">{statusLabels[item.status]}</Text>
            </View>
            <Text className="mt-2 text-gray-300">
              {item.items.reduce((sum, orderItem) => sum + orderItem.quantity, 0)} productos
            </Text>
            <Text className="mt-1 text-lg font-bold text-white">${item.total.toFixed(2)}</Text>
            <Text className="mt-2 text-sm text-gray-400">Ver seguimiento →</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
