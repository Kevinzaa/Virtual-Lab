import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Glassmorphism = ({ children }) => {
  return (
    <View style={styles.glassmorphismContainer}>
      <View style={styles.glassmorphism}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  glassmorphismContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Subtle background blur
    borderRadius: 20,
    padding: 20,
  },
  glassmorphism: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Main glass effect
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Glassmorphism;