// Import necessary types
import React from 'react';
import { Text } from 'react-native';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from './src/theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ProductListScreen from './src/screens/ProductListScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';

export type TabParamList = {
  Products: undefined;
  Favorites: undefined;
};

export type RootStackParamList = {
  Home: NavigatorScreenParams<TabParamList>;
  ProductDetails: { productId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textBlack,
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 14, fontWeight: '500', paddingBottom: 4 },
        tabBarStyle: {
          backgroundColor: colors.textWhite,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          height: 64,
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Products') {
            return (
              <Icon
                name="view-grid"
                size={28}
                color={focused ? colors.primary : colors.textBlack}
                style={{ marginBottom: 2 }}
              />
            );
          }
          if (route.name === 'Favorites') {
            return (
              <Icon
                name={focused ? 'heart' : 'heart-outline'}
                size={28}
                color={focused ? colors.primary : colors.textBlack}
                style={{ marginBottom: 2 }}
              />
            );
          }
          return null;
        },
      })}
    >
      <Tab.Screen name="Products" component={ProductListScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}

const linking = {
  prefixes: ['YourStore://'],
  config: {
    screens: {
      Home: {
        screens: {
          Products: 'products',
          Favorites: 'favorites',
        },
      },
      ProductDetails: 'product/:productId',
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{ title: 'Product Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
