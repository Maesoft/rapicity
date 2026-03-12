import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import StoreCard from '@/components/store/StoreCard';
import SubCategoryCarousel from '@/components/client/SubCategoryCarousel';
import CategoryCard from '@/components/client/CategoryCard';

import { stores } from '@/data/stores';
import { categories } from '@/data/categories';
import { subCategories } from '@/data/subCategories';

export default function Home() {
  const [mainCategory, setMainCategory] = useState<string | null>(null);
  const [subCategory, setSubCategory] = useState<string | null>(null);

  const handleSelectCategory = (id: string) => {
    setMainCategory(id);
    setSubCategory(null);
  };

  const handleBack = () => {
    setMainCategory(null);
    setSubCategory(null);
  };

  const filteredSubCategories = subCategories.filter((sub) => sub.categoryId === mainCategory);

  const filteredStores = stores.filter((store) => {
    if (!subCategory) return store.category === mainCategory;

    return store.category === mainCategory && store.subCategoryIds.includes(subCategory);
  });

  // PANTALLA DE CATEGORIAS
  if (!mainCategory) {
    return (
      <View className="flex-1 justify-center bg-gray-200 p-4">
        <Text className="mb-6 text-center text-2xl font-bold">¿Qué necesitás hoy?</Text>

        <CategoryCard categories={categories} onSelectCategory={handleSelectCategory} />
      </View>
    );
  }

  // HOME CON SUBCATEGORIAS
  return (
    <View className="flex-1 bg-gray-200 p-4">
      {/* Botón volver */}
      <TouchableOpacity onPress={handleBack} className="mb-2 mt-8">
        <Text className="font-semibold text-orange-500">← Volver a categorías</Text>
      </TouchableOpacity>

      {/* Saludo */}
      <Text className="mb-2 text-2xl font-bold">Hola 👋</Text>

      <Text className="mb-4 text-gray-500">¿Qué querés pedir hoy?</Text>

      {/* Buscador */}
      <TextInput placeholder="Buscar..." className="mb-6 rounded-xl bg-white p-3" />

      {/* Subcategorías */}
      <SubCategoryCarousel
        categories={filteredSubCategories}
        onSelectSubCategory={setSubCategory}
      />

      {/* Stores */}
      <Text className="mb-3 text-lg font-semibold">Comercios cerca tuyo</Text>

      <FlatList
        data={filteredStores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StoreCard store={item} />}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}
