import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        // 🎨 Estilo general (dark como tu app)
        tabBarStyle: {
          backgroundColor: '#005F73', // gris oscuro (tailwind gray-800)
          borderTopWidth: 0,
          height: 100,
          paddingBottom: 8,
          paddingTop: 8,
        },

        // 🎯 Colores
        tabBarActiveTintColor: '#f97316', // naranja (orange-500)
        tabBarInactiveTintColor: '#9ca3af', // gris

        // 🧼 Labels
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      {/* 🏠 INICIO */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      {/* ❤️ FAVORITOS */}
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />

      {/* 🛒 CARRITO */}
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Ordenes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />

      {/* 👤 PERFIL */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}