import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { SubCategory } from '@/src/types/SubCategory';

type Props = {
  categories: SubCategory[];
  onSelectSubCategory: (id: string) => void;
};

export default function SubCategoryCarousel({ categories, onSelectSubCategory }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const handlePress = (id: string) => {
    setSelected(id);
    onSelectSubCategory(id);
  };

  return (
    <View className="my-3">
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isActive = item.id === selected;

          return (
            <TouchableOpacity
              onPress={() => handlePress(item.id)}
              className={`mr-3 flex-row items-center rounded-full border px-4 py-2 ${
                isActive ? 'border-orange-400 bg-orange-500' : 'border-slate-600 bg-slate-800'
              }`}>
              <Text className="mr-1">{item.icon}</Text>

              <Text className={`font-semibold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
