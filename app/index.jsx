import React from "react";
import { Text, View, StyleSheet, ImageBackground, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../style";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";
import Glassmorphism from "../components/Glassmorphism";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();
  const { width: screenWidth } = useWindowDimensions();
  const isWeb = screenWidth >= 768; // Breakpoint untuk web layout

  if (!isLoading && isLoggedIn) {
    return <Redirect href={"/home"} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={images.itb}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.glassmorphismContainer}>
          <Glassmorphism isWeb={isWeb}>
            <Text style={[styles.text, isWeb && styles.webText]}>
              Unlock the wonders of science with{" "}
              <Text style={styles.highlightedText}>
                SmartLab
              </Text>
            </Text>
            <Text style={[styles.description, isWeb && styles.webDescription]}>
              Where curiosity ignites discovery—step into a world of boundless knowledge with SmartLab.
            </Text>
            <CustomButton
              title="Continue with Email"
              handlePress={() => router.push("/sign-in")}
              containerStyles={[styles.buttonContainer, isWeb && styles.webButtonContainer]}
              textStyles={[styles.buttonText, isWeb && styles.webButtonText]}
              isLoading={false}
            />
          </Glassmorphism>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  backgroundImage: {
    flex: 1,
    width: "100%", // Memastikan gambar memenuhi lebar layar
    height: "100%", // Memastikan gambar memenuhi tinggi layar
    resizeMode: "cover", // Menjaga aspek rasio gambar
  },
  glassmorphismContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 25,
    color: "#2A2C41",
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    marginTop: 20,
  },
  webText: {
    fontSize: 32, // Membesar untuk web
    textAlign: "center",
  },
  highlightedText: {
    color: theme.colors.secondary.DEFAULT,
    fontSize: 25,
    fontFamily: "Poppins-Bold",
  },
  description: {
    marginTop: 16,
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#2A2C41",
    textAlign: "center",
  },
  webDescription: {
    fontSize: 16, // Membesar untuk web
  },
  buttonContainer: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  webButtonContainer: {
    paddingVertical: 16, // Membesar untuk web
    paddingHorizontal: 40,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: theme.colors.white.DEFAULT,
  },
  webButtonText: {
    fontSize: 18, // Membesar untuk web
  },
});
