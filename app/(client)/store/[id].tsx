import { View, Text, Image, FlatList, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { stores } from '@/src/data/stores';
import { products } from '@/src/data/products';
import { Product } from '@/src/types/Product';

export default function ProductListScreen() {
  const { id } = useLocalSearchParams();

  const store = stores.find((s) => s.id === id);
  const storeProducts = products.filter((p) => p.storeId === id);

  const handleAddToCart = (product: Product) => {
    console.log('Agregado:', product.name);
    // después acá podés conectar con tu contexto de carrito
  };

  if (!store) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Store not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-800">
      <Image source={{ uri: store.image }} className="h-40 w-full" />

      <View className="p-4">
        <Text className="text-2xl font-bold text-white">{store.name}</Text>
        <Text className="text-gray-400">{store.description}</Text>
        <Text className="mt-2 text-gray-400">{store.deliveryTime}</Text>
      </View>

      <FlatList
        data={storeProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="m-2 flex-row items-center justify-between rounded-xl bg-gray-700 p-4">
            <View className="flex-row items-center gap-3">
              <Image source={{ uri: item.image }} className="h-20 w-20 rounded-lg" />
              <View>
                <Text className="text-lg text-white">{item.name}</Text>
                <Text className="text-gray-300">${item.price.toFixed(2)}</Text>
              </View>
            </View>

            {/* DERECHA (botón) */}
            <Pressable
              onPress={() => handleAddToCart(item)}
              className="rounded-lg bg-background px-4 py-2">
              <Text className="font-bold text-black">🛒</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
