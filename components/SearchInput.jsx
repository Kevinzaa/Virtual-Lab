import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import theme from '../style';
import {icons} from '../constants'
import {usePathname, router} from 'expo-router';

const SearchInput = ({initialQuery}) => {
  const pathname = usePathname()
  const [query, setQuery] = useState(initialQuery ||'')
  const [isFocused, setIsFocused] = useState(false);

  return (
      <View
        style={[
          styles.inputContainer,
          isFocused && { borderColor: theme.colors.orange.DEFAULT }, // Change border color on focus
        ]}
      >
        <TextInput
          style={styles.input}
          value={query}
          placeholder="Search for a video topic"
          placeholderTextColor= "#CDCDE0"
          onChangeText={(e) => setQuery(e)}
          onFocus={() => setIsFocused(true)} 
          onBlur={() => setIsFocused(false)} 
        />

        <TouchableOpacity
          onPress={() => {
            if (!query) {
              return Alert.alert('Data tidak ditemukan!',
                "Silahkan masukkan data serupa yang ingin dicari ke dalam database.",
              )
            }

            if (pathname.startsWith('/search')) router.setParams({query})
            else router.push(`/search/${query}`)
          }}
        >
          
          <Image
            source={icons.search}
            resizeMode='contain'
            style={{height:20, width:20}}
          />
        </TouchableOpacity>

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.white.DEFAULT,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.black[200], 
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.black[100],
  },
  input: {
    fontSize: 16, 
    marginTop: 2, 
    flex: 1, 
    fontFamily: 'Poppins-Regular', 
    color: theme.colors.white.DEFAULT,
  },
  toggleButton: {
    marginLeft: 8,
  },
  icon: {
    width: 20, 
    height: 20, 
    justifyContent: 'center',
    resizeMode: 'contain',
  },
});

export default SearchInput;
