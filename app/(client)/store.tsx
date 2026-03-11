import { View, FlatList } from "react-native";
import StoreCard from "../../components/store/StoreCard";
import { stores } from "../../data/stores";

export default function Stores() {
  return (
    <View className="flex-1 bg-gray-100 p-4">
      <FlatList
        data={stores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StoreCard store={item} />}
      />
    </View>
  );
}