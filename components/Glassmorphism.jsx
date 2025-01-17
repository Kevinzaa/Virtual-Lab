import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";

const Glassmorphism = ({ children, isWeb }) => {
  return (
    <View style={[styles.glassmorphismContainer, isWeb && styles.webContainer]}>
      <View style={[styles.glassmorphism, isWeb && styles.webGlassmorphism]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  glassmorphismContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Subtle background blur
    borderRadius: 20,
    padding: 20,
  },
  webContainer: {
    maxWidth: 600, // Lebar maksimum untuk web
    width: "90%",
  },
  glassmorphism: {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Main glass effect
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  webGlassmorphism: {
    padding: 32, // Membesar untuk web
  },
});

export default Glassmorphism;
