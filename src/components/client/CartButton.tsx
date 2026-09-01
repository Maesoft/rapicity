import { View, Text, Pressable } from 'react-native';
import { useContext } from 'react';
import { router } from 'expo-router';
import { CartContext } from '@/src/context/CartContext';

export default function CartButton() {
  const cartContext = useContext(CartContext);

  if (!cartContext?.cart.length) {
    return null;
  }

  // Cantidad total de productos
  const totalItems = cartContext.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Precio total
  const totalPrice = cartContext.cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <View className="absolute bottom-20 left-4 right-4">
      <Pressable
        onPress={() => router.push('/cart')}
        className="flex-row items-center justify-between rounded-2xl bg-[#005F73] px-5 py-4"
      >
        <View>
          <Text className="text-base font-bold text-gray-900">
            Ver carrito
          </Text>

          <Text className="text-sm text-gray-800">
            {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
          </Text>
        </View>

        <Text className="text-lg font-bold text-gray-900">
          ${totalPrice.toFixed(2)}
        </Text>
      </Pressable>
    </View>
  );
}