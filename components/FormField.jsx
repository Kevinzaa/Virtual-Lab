import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
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

  return (
    <View style={[styles.container, otherStyles]}>
      {/* Label */}
      <Text style={styles.label}>{title}</Text>

      {/* Input Field */}
      <View
        style={[
          styles.inputContainer,
          isFocused && { borderColor: theme.colors.orange.DEFAULT }, // Change border color on focus
        ]}
      >
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#999"
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
    flex: 1,
    height: 50,
    fontSize: 16,
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
