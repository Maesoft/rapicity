import { useState } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [offers, setOffers] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const SettingRow = ({
    label,
    description,
    value,
    onValueChange,
  }: {
    label: string;
    description: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
  }) => (
    <View className="mb-3 flex-row items-center justify-between rounded-xl bg-gray-700 p-4">
      <View className="mr-4 flex-1">
        <Text className="font-semibold text-white">{label}</Text>
        <Text className="mt-1 text-sm text-gray-400">{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#475569', true: '#fb923c' }}
        thumbColor="#f8fafc"
      />
    </View>
  );

  return (
    <ScrollView
      className="flex-1 bg-gray-800 p-4"
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}>
      <Pressable onPress={() => router.back()} className="mb-6 mt-10">
        <Text className="font-semibold text-orange-400">← Volver al perfil</Text>
      </Pressable>
      <Text className="mb-2 text-3xl font-bold text-white">Configuración</Text>
      <Text className="mb-6 text-gray-400">Personalizá tu experiencia en Rapicity.</Text>

      <SettingRow
        label="Notificaciones"
        description="Recibí actualizaciones sobre tus pedidos."
        value={notifications}
        onValueChange={setNotifications}
      />
      <SettingRow
        label="Ofertas y promociones"
        description="Recibí novedades y descuentos."
        value={offers}
        onValueChange={setOffers}
      />
      <SettingRow
        label="Modo oscuro"
        description="Usar la apariencia oscura de la aplicación."
        value={darkMode}
        onValueChange={setDarkMode}
      />

      <Pressable
        onPress={() => router.back()}
        className="mt-auto items-center rounded-xl border border-orange-400 p-4">
        <Text className="font-bold text-orange-400">Cerrar</Text>
      </Pressable>
    </ScrollView>
  );
}
