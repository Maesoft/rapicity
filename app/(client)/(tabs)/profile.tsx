import { Alert, View, Text, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '@/src/context/AuthContext';

export default function Profile() {
  const { user, signOut } = useAuth();
  const roleLabels = {
    client: 'Cliente',
    business: 'Negocio',
    delivery: 'Repartidor',
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
    <ScrollView
      className="flex-1 bg-gray-800 p-4"
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}>
      {/* 👤 HEADER */}
      <View className="mb-6 mt-10 items-center">
        <View className="mb-3 h-24 w-24 items-center justify-center rounded-full bg-gray-700">
          <Ionicons name="person" size={48} color="#fb923c" />
        </View>
        <Text className="text-xl font-bold text-white">{user?.name ?? 'Usuario'}</Text>
        <Text className="text-gray-400">{user?.email ?? 'Sin email'}</Text>
        <Text className="mt-1 text-sm font-semibold text-orange-400">
          {user ? roleLabels[user.role] : 'Cliente'}
        </Text>
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
        onPress={() => router.push('/addresses')}
      />

      <MenuItem
        icon="card-outline"
        label="Métodos de pago"
        onPress={() => router.push('/payment-methods')}
      />

      <MenuItem
        icon="settings-outline"
        label="Configuración"
        onPress={() => router.push('/settings')}
      />

      {/* 🚪 LOGOUT */}
      <Pressable
        onPress={() =>
          Alert.alert('Cerrar sesión', '¿Querés cerrar tu sesión?', [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Cerrar sesión',
              style: 'destructive',
              onPress: () => {
                signOut();
                router.replace('/login');
              },
            },
          ])
        }
        className="mt-auto items-center rounded-xl bg-red-500 p-4">
        <Text className="font-bold text-white">Cerrar sesión</Text>
      </Pressable>
    </ScrollView>
  );
}
