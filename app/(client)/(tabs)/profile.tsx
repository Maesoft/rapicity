import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
  const user = {
    name: "Matias Eguia",
    email: "matias@email.com",
    avatar: "https://i.pravatar.cc/150?img=70",
  };

  const MenuItem = ({ icon, label, onPress }: any) => (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between bg-gray-700 p-4 rounded-xl mb-3"
    >
      <View className="flex-row items-center gap-3">
        <Ionicons name={icon} size={20} color="#f97316" />
        <Text className="text-white text-base">{label}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
    </Pressable>
  );

  return (
    <ScrollView className="flex-1 bg-gray-800 p-4">
      
      {/* 👤 HEADER */}
      <View className="items-center mt-10 mb-6">
        <Image
          source={{ uri: user.avatar }}
          className="w-24 h-24 rounded-full mb-3"
        />
        <Text className="text-white text-xl font-bold">{user.name}</Text>
        <Text className="text-gray-400">{user.email}</Text>
      </View>

      {/* 📦 OPCIONES */}
      <MenuItem
        icon="receipt-outline"
        label="Mis pedidos"
        onPress={() => console.log("Pedidos")}
      />

      <MenuItem
        icon="location-outline"
        label="Direcciones"
        onPress={() => console.log("Direcciones")}
      />

      <MenuItem
        icon="card-outline"
        label="Métodos de pago"
        onPress={() => console.log("Pagos")}
      />

      <MenuItem
        icon="settings-outline"
        label="Configuración"
        onPress={() => console.log("Config")}
      />

      {/* 🚪 LOGOUT */}
      <Pressable
        onPress={() => console.log("Logout")}
        className="mt-6 bg-red-500 p-4 rounded-xl items-center"
      >
        <Text className="text-white font-bold">Cerrar sesión</Text>
      </Pressable>

    </ScrollView>
  );
}