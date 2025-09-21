import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Product } from '../types';

type StoreState = {
  products: Product[];
  favorites: string[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  fetchProducts: () => Promise<void>;
  toggleFavorite: (id: string) => void;
  setSearchQuery: (query: string) => void;
  loadFavorites: () => Promise<void>;
};

export const useProductStore = create<StoreState>((set, get) => ({
  products: [],
  favorites: [],
  loading: false,
  error: null,
  searchQuery: '',
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        'https://mocki.io/v1/c53fb45e-5085-487a-afac-0295f62fb86e',
      );
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      set({ products: data, loading: false });
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : 'Failed to fetch products.';
      set({ error: errorMessage, loading: false });
    }
  },
  toggleFavorite: async id => {
    const { favorites } = get();
    let updated: string[];
    if (favorites.includes(id)) {
      updated = favorites.filter(favId => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    set({ favorites: updated });
    await AsyncStorage.setItem('favorites', JSON.stringify(updated));
  },
  setSearchQuery: query => set({ searchQuery: query }),
  loadFavorites: async () => {
    try {
      const data = await AsyncStorage.getItem('favorites');
      if (data) {
        set({ favorites: JSON.parse(data) });
      }
    } catch {
      set({ favorites: [] });
    }
  },
}));
