import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import { images } from "../../constants"
import theme from '../../style'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

const SignUp = () => {
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    username:'',
    email:'',
    password: '',
  })

  const submit = async () => {
    if(!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill all fields')
    }

    setIsSubmitting(true);
    
    try{
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);
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
          <Text style={{fontSize: 30, color: theme.colors.secondary.DEFAULT, fontFamily:'Poppins-Bold'}}>
            SmartLab
          </Text>
          <Text style={styles.text}>
            Sign up to SmartLab
          </Text>
          <FormField
            title = "Username"
            value = {form.username}
            handleChangeText ={(e) => setForm({...form, username:e})}
            otherStyles = {{marginTop: 24}}
            keyboardType="email-address"
          />
          <FormField
            title = "Email"
            value = {form.email}
            handleChangeText ={(e) => setForm({...form, email:e})}
            otherStyles = {{marginTop: 7}}
            keyboardType="email-address"
          />
          <FormField
            title = "Password"
            value = {form.password}
            handleChangeText ={(e) => setForm({...form, password:e})}
            otherStyles = {{marginTop: 7}}
          />

          <CustomButton
            title = "Sign up"
            containerStyles = {{marginTop: 14}}
            handlePress = {submit}
            isLoading={isSubmitting}
          />

          <View style={{justifyContent:'center', paddingTop:10, flexDirection:'row', gap:2}}>
            <Text style={{color:theme.colors.black.DEFAULT, fontSize:15, fontFamily:'Poppins-Regular'}}>
              Already have account? {''}
            </Text>
            <Link href="/sign-in" style={{color:theme.colors.secondary[200], fontSize:15, fontFamily:'Poppins-SemiBold'}}>
              Sign In
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
    minHeight: '90%',    
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
    color: theme.colors.black.DEFAULT,
    fontFamily: 'Poppins-SemiBold',
    marginTop:30,
  }
})

export default SignUp