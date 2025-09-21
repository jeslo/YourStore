import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import colors from '../theme/colors';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search',
}: Props) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={styles.input}
      accessible={true}
      accessibilityLabel={placeholder}
      autoCorrect={false}
      autoCapitalize="none"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 8,
    padding: 8,
    backgroundColor: colors.textWhite,
    borderRadius: 16,
    fontSize: 16,
  },
});
