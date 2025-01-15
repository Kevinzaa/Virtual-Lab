import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../style";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";
import Glassmorphism from "../components/Glassmorphism";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

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
          <Glassmorphism>
            <Text style={styles.text}>
              Discover Endless{'\n'}Possibilities with{' '}
              <Text
                style={{
                  color: theme.colors.secondary.DEFAULT,
                  fontSize: 25,
                  fontFamily: "Poppins-Bold",
                }}
              >
                SmartLab
              </Text>
            </Text>
            <Text
              style={{
                marginTop: 16,
                fontSize: 13,
                fontFamily: "Poppins-Regular",
                color: "#2A2C41",
                textAlign: "center",
              }}
            >
              Where creativity meets innovation: embark on a journey
              of limitless exploration with Aora
            </Text>
            <CustomButton
              title="Continue with Email"
              handlePress={() => router.push("/sign-in")}
              containerStyles={{ width: "100%", marginTop: 20 }}
              textStyles={{ fontSize: 18 }}
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
});
