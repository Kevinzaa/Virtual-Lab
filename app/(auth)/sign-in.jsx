import { View, Text, ScrollView, Image, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import { images } from "../../constants"
import theme from '../../style'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider';


const SignIn = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email:'',
    password: '',
  })

  const submit = async () => {
    if(!form.email || !form.password) {
      Alert.alert('Error', 'Please fill all fields')
    }

    setIsSubmitting(true);
    
    try{
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      Alert.alert('Success', 'Logged in successfully');
      router.replace('/home')

    } catch (error){
      Alert.alert('Error', error.message) 

    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={{backgroundColor:theme.colors.primary, height:'100%'}}>
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={images.logo}
            style={styles.logo}
          />
          <Text style={styles.text}>
            Log in to Aora
          </Text>
          <FormField
            title = "Email"
            value = {form.email}
            handleChangeText ={(e) => setForm({...form, email:e})}
            otherStyles = {{marginTop: 24}}
            keyboardType="email-address"
          />
          <FormField
            title = "Password"
            value = {form.password}
            handleChangeText ={(e) => setForm({...form, password:e})}
            otherStyles = {{marginTop: 7}}
          />

          <CustomButton
            title = "Sign in"
            containerStyles = {{marginTop: 14}}
            handlePress = {submit}
            isLoading={isSubmitting}
          />

          <View style={{justifyContent:'center', paddingTop:10, flexDirection:'row', gap:2}}>
            <Text style={{color:theme.colors.gray[100], fontSize:15, fontFamily:'Poppins-Regular'}}>
              Don't have account? {''}
            </Text>
            <Link href="/sign-up" style={{color:theme.colors.secondary.DEFAULT, fontSize:15, fontFamily:'Poppins-Regular'}}>
              Sign Up
            </Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',          
    justifyContent: 'center', 
    minHeight: '85%',    
    paddingHorizontal: 16, 
    marginVertical: 24,     
  },
  logo:{
    width: 115,
    height: 35,
    resizeMode: 'contain',
  },
  text:{
    fontSize:22,
    color: theme.colors.white.DEFAULT,
    fontFamily: 'Poppins-SemiBold',
    marginTop:30,
  }
})

export default SignIn