import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import theme from '../style';

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // State to track focus
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.container, otherStyles]}>
      {/* Label */}
      <Text style={styles.label}>{title}</Text>

      {/* Input Field */}
      <View
        style={[
          styles.inputContainer,
          isFocused && { borderColor: theme.colors.secondary.DEFAULT },
          { width: '100%' },
        ]}
      >
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor= "#9e9e9e"
          secureTextEntry={title === 'Password' && !showPassword}
          onChangeText={handleChangeText}
          onFocus={() => setIsFocused(true)} // Set focus state to true
          onBlur={() => setIsFocused(false)} // Set focus state to false
          {...props}
        />

        {/* Show/Hide Password Button */}
        {title === 'Password' && (
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={
                showPassword
                  ? require('../assets/icons/eye-hide.png') 
                  : require('../assets/icons/eye.png') 
              }
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
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
    color: theme.colors.secondary.DEFAULT,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.secondary[100], 
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.white.DEFAULT,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: theme.colors.secondary.DEFAULT,
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
