import { View, Text, TouchableOpacity } from "react-native";
import { useCart } from "@/context/CartContext";
import { useNavigation } from "@react-navigation/native";

export default function CartButton() {
  const { cart, getTotal } = useCart();
  const navigation = useNavigation();

  if (cart.length === 0) return null;

  const total = getTotal();
  const itemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <View className="absolute bottom-0 left-0 right-0 p-4 bg-transparent">
      <TouchableOpacity
        className="bg-green-600 rounded-2xl p-4 flex-row justify-between items-center"
        onPress={() => navigation.navigate("Cart")}
      >
        <Text className="text-white font-bold">
          {itemsCount} productos
        </Text>

        <Text className="text-white font-bold">
          ${total}
        </Text>
      </TouchableOpacity>
    </View>
  );
}