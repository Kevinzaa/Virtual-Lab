import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import theme from "../style"; 
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants"
import CustomButton from "../components/CustomButton";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {

  const {isLoading, isLoggedIn} = useGlobalContext();

  if (!isLoading && isLoggedIn) {
    return <Redirect href={"/home"} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View style={styles.view}>
          <Image
            source = {images.logo}
            style = {styles.logo}
          />
          <Image
            source = {images.cards}
            style = {styles.cards}
          />
          <View style={{marginTop: 16, position:'relative'}}>
            <Text style={styles.text}>
              Discover Endless{'\n'}Possibilities with {''}
              <Text style={{color: theme.colors.orange.DEFAULT, fontSize: 25, fontFamily: 'Poppins-Bold', justifyContent:'center'}}>
                Aora
              </Text>
            </Text>
            <Image 
              source={images.path}
              style={{width:130, height:18, position:'absolute', top: 63, right: -30, resizeMode:'contain'}}
            />
          </View>

          <Text style={{marginTop: 16, fontSize: 13, fontFamily: 'Poppins-Regular', color: theme.colors.white.DEFAULT, textAlign: 'center'}}>
            Where creativity meets innovation: embark on a journey
            of limitless exploration with Aora
          </Text>
          
          <CustomButton
            title="Continue with Email" 
            handlePress={() => router.push('/sign-in')}
            containerStyles={{ width: '100%', marginTop: 20 }} 
            textStyles={{ fontSize: 18 }} 
            isLoading={false} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  view:{
    width: '100%',
    height: '100%', 
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent:'center',
  },
  logo:{
    width: 130,
    height: 84,
    resizeMode: 'contain',
  },
  cards:{
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    maxWidth: 380,
  },
  text:{
    fontSize:25,
    color: theme.colors.white.DEFAULT,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  }
});
