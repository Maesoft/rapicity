import { View, Text, Image, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Store } from '@/src/types/Stores';

type Props = {
  store: Store;
};

export default function StoreCard({ store }: Props) {
  return (
    <Pressable
      onPress={() => router.push(`/store/${store.id}`)}
      className="mb-4 overflow-hidden rounded-2xl bg-gray-800 shadow">
      <Image
        source={typeof store.image === 'string' ? { uri: store.image } : store.image}
        className="h-32 w-full"
        resizeMode="cover"
      />

      <View className="p-3">
        <Text className="text-lg font-semibold text-white">{store.name}</Text>

        <Text className="text-gray-400">{store.description}</Text>

        <View className="mt-2 flex-row justify-between">
          <Text
            className={store.isOpen ? 'font-medium text-green-600' : 'font-medium text-red-500'}>
            {store.isOpen ? 'Abierto' : 'Cerrado'}
          </Text>

          <Text className="text-gray-500">{store.deliveryTime}</Text>
        </View>
      </View>
    </Pressable>
  );
}
