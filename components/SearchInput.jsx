import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import theme from '../style';
import { icons } from '../constants';
import { usePathname, router } from 'expo-router';

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.inputContainer,
        isFocused && { borderColor: theme.colors.secondary.DEFAULT },
      ]}
    >
      <TextInput
        style={styles.input}
        value={query}
        placeholder="Search for a video topic"
        onChangeText={(e) => setQuery(e)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert('Data tidak ditemukan!',
              "Silahkan masukkan data serupa yang ingin dicari ke dalam database.",
            );
          }

          if (pathname.startsWith('/search')) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image
          source={icons.search}
          resizeMode='contain'
          style={{ height: 20, width: 20 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.secondary[100],
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.white.DEFAULT,
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    marginTop: 2,
    flex: 1,
    fontFamily: 'Poppins-Regular',
    color: theme.colors.black.DEFAULT,
  },
});

export default SearchInput;