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
      className="mb-4 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 shadow">
      <Image
        source={typeof store.image === 'string' ? { uri: store.image } : store.image}
        className="h-32 w-full"
        resizeMode="cover"
      />

      <View className="p-3">
        <View className="flex-row items-center justify-between">
          <Text className="flex-1 text-lg font-semibold text-white">{store.name}</Text>
          <Text className="ml-2 rounded-full bg-slate-700 px-2 py-1 text-xs text-slate-300">
            {store.deliveryTime}
          </Text>
        </View>

        <Text numberOfLines={2} className="mt-1 text-sm leading-5 text-slate-400">
          {store.description}
        </Text>

        <View className="mt-3 flex-row items-center justify-between">
          <Text className={`font-semibold ${store.isOpen ? 'text-emerald-400' : 'text-red-400'}`}>
            {store.isOpen ? 'Abierto' : 'Cerrado'}
          </Text>
          <Text className="text-sm font-semibold text-orange-400">Ver menú →</Text>
        </View>
      </View>
    </Pressable>
  );
}
