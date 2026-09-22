import { View, Text, FlatList, Image, Pressable } from 'react-native';
import { useContext } from 'react';
import { router } from 'expo-router';
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
      <Text className="mt-10 p-4 text-2xl font-bold text-white">Mi carrito</Text>

      <FlatList
        data={cartContext.cart}
        keyExtractor={(item) => item.product.id}
        renderItem={({ item }) => (
          <View className="m-2 flex-row items-center rounded-xl bg-gray-700 p-4">
            <Image
              source={
                typeof item.product.image === 'string'
                  ? { uri: item.product.image }
                  : item.product.image
              }
              className="h-20 w-20 rounded-lg"
            />

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
      <View className="border-t border-gray-700 bg-gray-800 p-4">
        <View className="mb-3 flex-row justify-between">
          <Text className="text-lg text-gray-300">Total</Text>
          <Text className="text-2xl font-bold text-white">
            $
            {cartContext.cart
              .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
              .toFixed(2)}
          </Text>
        </View>
        <Pressable
          onPress={() => router.push('/checkout')}
          className="items-center rounded-xl bg-orange-500 p-4">
          <Text className="text-lg font-bold text-white">Continuar al checkout</Text>
        </Pressable>
      </View>
    </View>
  );
}
