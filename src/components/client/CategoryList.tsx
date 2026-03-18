import { FlatList } from "react-native";
import CategoryCard from "./CategoryCard";
import { Category } from "@/src/types/Category";

type Props = {
  categories: Category[];
  onSelectCategory: (id: string) => void;
};

export default function CategoryList({ categories, onSelectCategory }: Props) {
  return (
    <FlatList
      data={categories}
      numColumns={2}
      key="category-grid"
      keyExtractor={(item) => item.id}
      columnWrapperStyle={{ gap: 16 }}
      contentContainerStyle={{ gap: 16 }}
      renderItem={({ item }) => (
        <CategoryCard
          category={item}
          onPress={() => onSelectCategory(item.id)}
        />
      )}
    />
  );
}