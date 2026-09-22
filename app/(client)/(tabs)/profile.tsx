import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Profile() {
  const user = {
    name: 'Matias Eguia',
    email: 'matias@email.com',
    avatar: 'https://i.pravatar.cc/150?img=70',
  };

  const MenuItem = ({ icon, label, onPress }: any) => (
    <Pressable
      onPress={onPress}
      className="mb-3 flex-row items-center justify-between rounded-xl bg-gray-700 p-4">
      <View className="flex-row items-center gap-3">
        <Ionicons name={icon} size={20} color="#f97316" />
        <Text className="text-base text-white">{label}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
    </Pressable>
  );

  return (
    <ScrollView className="flex-1 bg-gray-800 p-4">
      {/* 👤 HEADER */}
      <View className="mb-6 mt-10 items-center">
        <Image source={{ uri: user.avatar }} className="mb-3 h-24 w-24 rounded-full" />
        <Text className="text-xl font-bold text-white">{user.name}</Text>
        <Text className="text-gray-400">{user.email}</Text>
      </View>

      {/* 📦 OPCIONES */}
      <MenuItem
        icon="receipt-outline"
        label="Mis pedidos"
        onPress={() => router.push('/(client)/(tabs)/orders')}
      />

      <MenuItem
        icon="location-outline"
        label="Direcciones"
        onPress={() => console.log('Direcciones')}
      />

      <MenuItem icon="card-outline" label="Métodos de pago" onPress={() => console.log('Pagos')} />

      <MenuItem
        icon="settings-outline"
        label="Configuración"
        onPress={() => console.log('Config')}
      />

      {/* 🚪 LOGOUT */}
      <Pressable
        onPress={() => console.log('Logout')}
        className="mt-6 items-center rounded-xl bg-red-500 p-4">
        <Text className="font-bold text-white">Cerrar sesión</Text>
      </Pressable>
    </ScrollView>
  );
}
