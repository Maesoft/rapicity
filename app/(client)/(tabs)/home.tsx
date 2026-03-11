import { View, Text, TextInput, FlatList } from "react-native";
import StoreCard from "components/store/StoreCard";
import { stores } from "data/stores";

export default function Home() {
  return (
    <View className="flex-1 bg-gray-200 p-4">

      {/* Saludo */}
      <Text className="text-2xl font-bold mb-2 mt-8">
        Hola 👋
      </Text>

      <Text className="text-gray-500 mb-4">
        ¿Qué querés pedir hoy?
      </Text>

      {/* Buscador */}
      <TextInput
        placeholder="Buscar comida o comercios..."
        className="bg-white p-3 rounded-xl mb-6"
      />

      {/* Categorías */}
      <View className="flex-row justify-between mb-6">

        <View className="items-center">
          <Text className="text-2xl">🍔</Text>
          <Text className="text-xs">Burgers</Text>
        </View>

        <View className="items-center">
          <Text className="text-2xl">🍕</Text>
          <Text className="text-xs">Pizza</Text>
        </View>

        <View className="items-center">
          <Text className="text-2xl">🍗</Text>
          <Text className="text-xs">Pollo</Text>
        </View>

        <View className="items-center">
          <Text className="text-2xl">🥪</Text>
          <Text className="text-xs">Sandwich</Text>
        </View>

      </View>

      {/* Lista de comercios */}
      <Text className="text-lg font-semibold mb-3">
        Comercios cerca tuyo
      </Text>

      <FlatList
        data={stores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StoreCard store={item} />
        )}
      />

    </View>
  );
}