import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import { useProductStore } from '../store/useProductStore';
import type { Product } from '../types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SmartImage from './SmartImage';

type Props = {
  product: Product;
  onPress?: () => void;
  style?: object;
};

const ProductCard: React.FC<Props> = React.memo(
  ({ product, onPress, style }) => {
    const { favorites, toggleFavorite } = useProductStore();
    const fav = favorites.includes(product.id);

    return (
      <TouchableOpacity
        style={[styles.card, style]}
        onPress={onPress}
        accessibilityLabel={`Product: ${product.name}`}
        activeOpacity={0.8}
      >
        <View style={styles.imageWrapper}>
          <SmartImage uri={product?.image} style={styles.image} />
        </View>
        <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
          {product.name}
        </Text>
        <View style={styles.row}>
          <Text style={styles.price}>${product.price}</Text>
          <TouchableOpacity
            onPress={() => toggleFavorite(product.id)}
            style={styles.heartBtn}
            accessibilityLabel={
              fav ? 'Remove from favorites' : 'Add to favorites'
            }
          >
            <Text
              style={[
                styles.heart,
                { color: fav ? colors.error : colors.textBlack },
              ]}
            >
              {fav ? (
                <Icon name="heart" size={28} color={colors?.primary} />
              ) : (
                <Icon name="heart-outline" size={28} color={colors?.primary} />
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.textWhite,
    marginVertical: 8,
    borderRadius: 18,
    paddingBottom: 12,
    alignSelf: 'stretch',
  },
  imageWrapper: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    overflow: 'hidden',
    backgroundColor: colors.background,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  name: {
    paddingHorizontal: 12,
    paddingTop: 10,
    color: colors.textBlack,
    fontSize: 17,
    fontWeight: '400',
    textAlign: 'left',
    width: '100%',
    height: 48,
    overflow: 'hidden',
  },
  row: {
    paddingHorizontal: 12,
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    color: colors.textBlack,
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'left',
  },
  heartBtn: {
    padding: 4,
  },
  heart: {
    fontSize: 24,
  },
});

export default ProductCard;
