import { Text, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  onPress?: () => void;
};

export default function Button({ title, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-primary py-4 rounded-xl mb-8"
    >
      <Text className="text-center font-bold text-lg text-background">
        {title}
      </Text>
    </TouchableOpacity>
  );
}