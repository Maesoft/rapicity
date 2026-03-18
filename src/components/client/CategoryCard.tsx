import { TouchableOpacity, Text } from "react-native";
import { Category } from "@/src/types/Category";

type Props = {
  category: Category;
  onPress: (id: string) => void;
};

export default function CategoryCard({ category, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={() => onPress(category.id)}
      className="flex-1 items-center justify-center rounded-2xl bg-gray-800 p-5 shadow"
    >
      <Text className="text-3xl mb-2">{category.icon}</Text>

      <Text className="text-center text-primary text-sm font-semibold">
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}