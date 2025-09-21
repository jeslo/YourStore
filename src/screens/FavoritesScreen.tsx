import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useProductStore } from '../store/useProductStore';
import colors from '../theme/colors';
import ProductGrid from '../components/ProductGrid';
import SearchBar from '../components/SearchBar';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

export default function FavoritesScreen() {
  const { products, favorites, loading, loadFavorites, fetchProducts } =
    useProductStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

  useEffect(() => {
    fetchProducts();
    loadFavorites();
  }, []);

  const favProducts = products.filter(p => favorites.includes(p.id));
  const filtered = favProducts.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleRefresh = async () => {
    await fetchProducts();
    await loadFavorites();
  };

  const goToProduct = (productId: string) => {
    navigation.navigate('ProductDetails', { productId });
  };

  if (loading) {
    return (
      <ActivityIndicator color={colors.primary} style={{ marginTop: 44 }} />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, paddingHorizontal: 8 }}>
        <Text style={styles?.heading}>Favorites</Text>
        <View style={styles.searchToggleRow}>
          <View style={{ flex: 1 }}>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search favorites"
            />
          </View>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              onPress={() => setViewMode('list')}
              style={styles.toggleButton}
              accessibilityLabel="List View"
            >
              <Icon
                name="format-list-bulleted-square"
                size={28}
                color={viewMode === 'list' ? colors.primary : '#000'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setViewMode('grid')}
              style={styles.toggleButton}
              accessibilityLabel="Grid View"
            >
              <Icon
                name="view-grid-outline"
                size={28}
                color={viewMode === 'grid' ? colors.primary : '#000'}
              />
            </TouchableOpacity>
          </View>
        </View>

        {filtered.length === 0 ? (
          <Text style={{ margin: 24 }}>No favorites found.</Text>
        ) : (
          <ProductGrid
            products={filtered}
            onPressCard={product => goToProduct(product.id)}
            viewMode={viewMode}
            refreshing={loading}
            onRefresh={handleRefresh}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
  },
  toggleButton: {
    marginLeft: 16,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.textBlack,
    marginVertical: 8,
    paddingHorizontal: 8,
  },
});
