import { TextInput } from "react-native";

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secure?: boolean;
};

export default function Input({
  placeholder,
  value,
  onChangeText,
  secure,
}: Props) {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#94a3b8"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secure}
      className="bg-white rounded-xl px-4 py-4 mb-4"
    />
  );
}