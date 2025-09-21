import React, { useMemo, useCallback } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  ListRenderItemInfo,
} from 'react-native';
import ProductCard from './ProductCard';
import type { Product } from '../types';
import colors from '../theme/colors';

type Props = {
  products: Product[];
  onPressCard?: (product: Product) => void;
  emptyText?: string;
  viewMode: 'list' | 'grid';
  onRefresh?: () => Promise<void>;
  refreshing?: boolean;
  onEndReached?: () => void;
};

export default function ProductGrid({
  products,
  onPressCard,
  emptyText = 'No products found.',
  viewMode,
  onRefresh,
  refreshing = false,
  onEndReached,
}: Props) {
  const numColumns = useMemo(() => {
    if (viewMode === 'grid') {
      return products.length === 1 ? 1 : 2;
    }
    return 1;
  }, [viewMode, products.length]);

  if (!products.length) {
    return <Text style={{ margin: 24 }}>{emptyText}</Text>;
  }

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Product>) => (
      <ProductCard
        product={item}
        onPress={() => onPressCard?.(item)}
        style={{
          width:
            numColumns === 2
              ? products.length === 1
                ? '100%'
                : '48%'
              : '100%',
          marginHorizontal: numColumns === 2 && products.length > 1 ? 8 : 0,
        }}
      />
    ),
    [onPressCard, numColumns],
  );

  const getItemLayout = useCallback(
    (_: ArrayLike<Product> | null | undefined, index: number) => ({
      length: 230,
      offset: 230 * index,
      index,
    }),
    [],
  );

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      numColumns={numColumns}
      renderItem={renderItem}
      getItemLayout={getItemLayout}
      key={numColumns}
      contentContainerStyle={{ paddingBottom: 16 }}
      columnWrapperStyle={
        numColumns === 2 ? { justifyContent: 'space-between' } : undefined
      }
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={21}
    />
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 16, flexGrow: 1 },
  row: { justifyContent: 'center' },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  toggleButton: {
    marginLeft: 16,
  },
});
