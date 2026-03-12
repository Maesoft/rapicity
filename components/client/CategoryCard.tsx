import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Category } from "@/types/Category";

type Props = {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
};

export default function CategoryCard({ categories, onSelectCategory }: Props) {
  return (
    <View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelectCategory(item.id)}
            className="mb-4 rounded-xl bg-white p-6"
          >
            <Text className="text-center text-lg">
              {item.icon} {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}