import { View, Text, FlatList, TextInput, TouchableOpacity, Image, Pressable } from 'react-native';
import { useState } from 'react';

import StoreCard from '@/src/components/store/StoreCard';
import SubCategoryCarousel from '@/src/components/client/SubCategoryCarousel';

import { stores } from '@/src/data/stores';
import { categories } from '@/src/data/categories';
import { subCategories } from '@/src/data/subCategories';
import CategoryList from '@/src/components/client/CategoryList';
import { useAuth } from '@/src/context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const [mainCategory, setMainCategory] = useState<string | null>(null);
  const [subCategory, setSubCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const handleSelectCategory = (id: string) => {
    setMainCategory(id);
    setSubCategory(null);
  };

  const handleBack = () => {
    setMainCategory(null);
    setSubCategory(null);
    setSearch('');
  };

  const filteredSubCategories = subCategories.filter((sub) => sub.categoryId === mainCategory);

  const categoryStores = stores.filter((store) => {
    if (!subCategory) return store.category === mainCategory;

    return store.category === mainCategory && store.subCategoryIds.includes(subCategory);
  });
  const filteredStores = categoryStores.filter((store) =>
    `${store.name} ${store.description}`.toLowerCase().includes(search.trim().toLowerCase())
  );

  // PANTALLA DE CATEGORIAS
  if (!mainCategory) {
    return (
      <View className="flex-1 bg-gray-900 px-4">
        <View className="mb-5 mt-10 items-center">
          <Image
            source={require('@/assets/logo_transparente2.png')}
            className="h-16 w-full"
            resizeMode="contain"
          />
        </View>

        <View className="mb-5">
          <Text className="text-base font-semibold text-orange-400">
            Hola, {user?.name ?? 'Usuario'} 👋
          </Text>
          <Text className="mt-1 text-3xl font-bold text-white">¿Qué necesitás hoy?</Text>
          <Text className="mt-2 text-sm leading-5 text-slate-400">
            Elegí una categoría y encontrá lo que estás buscando.
          </Text>
        </View>

        <View className="mb-5 flex-row items-center justify-between rounded-2xl border border-slate-700 bg-slate-800 px-4 py-4">
          <View>
            <Text className="font-semibold text-white">Explorá nuestros servicios</Text>
            <Text className="mt-1 text-sm text-slate-400">Todo en un solo lugar</Text>
          </View>
          <Text className="text-2xl">✨</Text>
        </View>

        <View className="flex-1">
          <CategoryList categories={categories} onSelectCategory={handleSelectCategory} />
        </View>
      </View>
    );
  }

  // HOME CON NEGOCIOS
  return (
    <View className="flex-1 bg-gray-900 p-4">
      <View className="-mx-4 mb-1 mt-8 w-screen items-center">
        <Image
          source={require('@/assets/logo_transparente2.png')}
          className="h-20 w-full"
          resizeMode="contain"
        />
      </View>

      <View className="mb-4 flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-xl font-bold text-white">Encontrá lo que buscás</Text>
          <Text className="mt-1 text-sm text-slate-400">Elegí un comercio cerca tuyo</Text>
        </View>
        <Pressable onPress={handleBack} className="rounded-full bg-slate-800 px-3 py-2">
          <Text className="text-sm font-semibold text-orange-400">Categorías</Text>
        </Pressable>
      </View>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar comercio..."
        placeholderTextColor="#94a3b8"
        className="mb-4 rounded-2xl border border-slate-700 bg-slate-800 p-4 text-white"
      />

      <Text className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Filtrar por tipo
      </Text>
      <SubCategoryCarousel
        categories={filteredSubCategories}
        onSelectSubCategory={setSubCategory}
      />

      <View className="mb-3 mt-2 flex-row items-end justify-between">
        <View>
          <Text className="text-lg font-bold text-white">Comercios cerca tuyo</Text>
          <Text className="mt-1 text-sm text-slate-400">
            {filteredStores.length}{' '}
            {filteredStores.length === 1 ? 'opción disponible' : 'opciones disponibles'}
          </Text>
        </View>
        {!!search && (
          <Pressable onPress={() => setSearch('')}>
            <Text className="font-semibold text-orange-400">Limpiar</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={filteredStores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StoreCard store={item} />}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListEmptyComponent={
          <View className="items-center rounded-2xl bg-slate-800 p-6">
            <Text className="mb-2 text-3xl">🔎</Text>
            <Text className="text-center font-semibold text-white">No encontramos comercios</Text>
            <Text className="mt-1 text-center text-sm text-slate-400">
              Probá con otro nombre o quitá el filtro de búsqueda.
            </Text>
          </View>
        }
      />
    </View>
  );
}
