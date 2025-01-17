import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../style";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";
import Glassmorphism from "../components/Glassmorphism";

const screenWidth = Dimensions.get('window').width;

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
            <Text style={styles.heading}>
              Unlock the wonders of science with {' '}
              <Text style={styles.highlightedText}>
                SmartLab
              </Text>
            </Text>
            <Text style={styles.subtitle}>
              Where curiosity ignites discovery—step into a world of boundless knowledge with SmartLab.
            </Text>
            <CustomButton
              title="Continue with Email"
              handlePress={() => router.push("/sign-in")}
              containerStyles={styles.buttonContainer}
              textStyles={styles.buttonText}
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
    width: '100%',
    height: '100%',
  },
  glassmorphismContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: screenWidth > 768 ? 40 : 20,
  },
  heading: {
    fontSize: screenWidth > 768 ? 36 : 25,
    color: "#2A2C41",
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    marginBottom: 20,
  },
  highlightedText: {
    color: theme.colors.secondary.DEFAULT,
    fontFamily: "Poppins-Bold",
  },
  subtitle: {
    fontSize: screenWidth > 768 ? 18 : 13,
    fontFamily: "Poppins-Regular",
    color: "#2A2C41",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    width: screenWidth > 768 ? '50%' : '80%',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: theme.colors.secondary.DEFAULT,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: "Poppins-Bold",
  }
});