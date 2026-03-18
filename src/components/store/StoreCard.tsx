import { View, Text, Image, Pressable } from "react-native";
import { router } from "expo-router";
import { Store } from "@/src/types/Stores";

type Props = {
  store: Store;
};

export default function StoreCard({ store }: Props) {
  return (
    <Pressable
      onPress={() => router.push(`/store/${store.id}`)}
      className="bg-gray-600 rounded-2xl mb-4 overflow-hidden shadow"
    >
      <Image
        source={{ uri: store.image }}
        className="w-full h-32"
        resizeMode="cover"
      />

      <View className="p-3">
        <Text className="text-lg text-white font-semibold">
          {store.name}
        </Text>

        <Text className="text-gray-400">
          {store.description}
        </Text>

        <View className="flex-row justify-between mt-2">
          <Text
            className={
              store.isOpen
                ? "text-green-600 font-medium"
                : "text-red-500 font-medium"
            }
          >
            {store.isOpen ? "Abierto" : "Cerrado"}
          </Text>

          <Text className="text-gray-500">
            {store.deliveryTime}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}