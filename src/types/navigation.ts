import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Products: undefined;
  Favorites: undefined;
};

export type RootStackParamList = {
  Home: NavigatorScreenParams<TabParamList>;
  ProductDetails: { productId: string };
};
