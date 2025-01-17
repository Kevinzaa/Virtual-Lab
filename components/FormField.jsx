import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import theme from '../style';
import { useWindowDimensions } from 'react-native';

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { width: screenWidth } = useWindowDimensions();
  const isWeb = screenWidth >= 768;

  return (
    <View style={[styles.container, otherStyles, isWeb && styles.webContainer]}>
      <Text style={[styles.label, isWeb && styles.webLabel]}>{title}</Text>

      <View
        style={[
          styles.inputContainer,
          isFocused && { borderColor: theme.colors.secondary.DEFAULT },
          isWeb && styles.webInputContainer,
        ]}
      >
        <TextInput
          style={[styles.input, isWeb && styles.webInput]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor= "#9e9e9e"
          secureTextEntry={title === 'Password' && !showPassword}
          onChangeText={handleChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

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
  webContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.secondary.DEFAULT,
    marginBottom: 8,
  },
  webLabel: {
    fontSize: 20,
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
  webInputContainer: {
    borderWidth: 3,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: theme.colors.secondary.DEFAULT,
  },
  webInput: {
    height: 60,
    fontSize: 18,
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

export default FormField;