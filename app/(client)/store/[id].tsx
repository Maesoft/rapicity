import { View, Text, Image, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { stores } from '@/src/data/stores';
import { products } from '@/src/data/products';

export default function ProductListScreen() {
  const { id } = useLocalSearchParams();

  const store = stores.find((s) => s.id === id);
  const storeProducts = products.filter((p: { storeId: string }) => p.storeId === id);

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
          <View className="m-2 rounded-xl bg-gray-700 p-4">
            <Text className="text-lg text-white">{item.name}</Text>

            <Text className="text-gray-300">${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}
