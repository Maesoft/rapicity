import { TouchableOpacity, Text, View } from 'react-native';
import { Category } from '@/src/types/Category';

type Props = {
  category: Category;
  onPress: (id: string) => void;
};

export default function CategoryCard({ category, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={() => onPress(category.id)}
      className="flex-1 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 p-5 shadow">
      <View className="mb-3 h-14 w-14 items-center justify-center rounded-2xl bg-slate-700">
        <Text className="text-3xl">{category.icon}</Text>
      </View>

      <Text className="text-center text-sm font-semibold text-white">{category.name}</Text>
    </TouchableOpacity>
  );
}
