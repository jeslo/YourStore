import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useProductStore } from '../store/useProductStore';
import colors from '../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SmartImage from '../components/SmartImage';

export default function ProductDetailsScreen() {
  const route = useRoute();
  const { products, favorites, toggleFavorite } = useProductStore();
  const productId = (route.params as { productId: string })?.productId;
  const product = products.find(p => p.id === productId);
  if (!product) return <Text style={{ margin: 28 }}>Product not found.</Text>;

  const fav = favorites.includes(product.id);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.imageWrapper}>
        <SmartImage
          uri={product.image}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => toggleFavorite(product.id)}
          style={styles.heartIconBtn}
        >
          <Icon
            name={'heart'}
            size={28}
            color={fav ? colors.primary : colors.textWhite}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>$ {product.price}</Text>
        <Text style={styles.desc}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 250,
    backgroundColor: '#f2f2f2',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heartIconBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    borderRadius: 16,
    padding: 6,
  },
  detailsSection: {
    backgroundColor: colors.textWhite,
    paddingVertical: 22,
    paddingHorizontal: 16,
  },
  name: {
    fontSize: 18,
    color: colors.textBlack,
    fontWeight: '700',
    marginBottom: 6,
  },
  price: {
    color: colors.textBlack,
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  desc: {
    color: colors.textBlack,
    fontSize: 16,
    lineHeight: 22,
  },
});
