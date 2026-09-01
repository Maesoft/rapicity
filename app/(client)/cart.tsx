import { View, Text, FlatList, Image, Pressable } from 'react-native';
import { useContext } from 'react';
import { CartContext } from '@/src/context/CartContext';

export default function CartScreen() {
  const cartContext = useContext(CartContext);

  if (!cartContext?.cart.length) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-800">
        <Text className="text-2xl font-bold text-white">Tu carrito está vacío</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-800">
      <Text className="p-4 mt-10 text-2xl font-bold text-white">Mi carrito</Text>

      <FlatList
        data={cartContext.cart}
        keyExtractor={(item) => item.product.id}
        renderItem={({ item }) => (
          <View className="m-2 flex-row items-center rounded-xl bg-gray-700 p-4">
            <Image source={{ uri: item.product.image }} className="h-20 w-20 rounded-lg" />

            <View className="ml-3 flex-1">
              <Text className="text-lg font-bold text-white">{item.product.name}</Text>

              <Text className="text-gray-300">${item.product.price.toFixed(2)}</Text>

              <Text className="mt-1 text-white">Cantidad: {item.quantity}</Text>
              <View className="mt-2 flex-row items-center">
                <Pressable
                  onPress={() => cartContext.decreaseQuantity(item.product.id)}
                  className="h-8 w-8 items-center justify-center rounded-full bg-white">
                  <Text className="text-lg font-bold">−</Text>
                </Pressable>
                <Text className="mx-4 text-lg font-bold text-white">{item.quantity}</Text>
                <Pressable
                  onPress={() => cartContext.increaseQuantity(item.product.id)}
                  className="h-8 w-8 items-center justify-center rounded-full bg-white">
                  <Text className="text-lg font-bold">+</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
