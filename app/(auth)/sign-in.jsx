import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants"
import theme from '../../style'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { getAccount, getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider';

const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

const SignIn = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email:'',
    password: '',
  })

  const submit = async () => {
    if (!form.email || !form.password) {
        Alert.alert('Error', 'Please fill all fields');
        return;
    }

    setIsSubmitting(true);
    try {
        const session = await signIn(form.email, form.password);
        if (session) {
            const result = await getCurrentUser();
            setUser(result);
            setIsLoggedIn(true);
            Alert.alert('Success', 'Logged in successfully');
            router.replace('/home');
        } else {
            throw new Error('Failed to create session.');
        }
    } catch (error) {
        Alert.alert('Error', error.message);
    } finally {
        setIsSubmitting(false);
    }
};


  // Pake ini kalo kejebak di activesession

  // const [isCheckingSession, setIsCheckingSession] = useState(true);

  // useEffect(() => {
  //   const checkSession = async () => {
  //     try {
  //       const currentAccount = await getAccount();
  //       if (currentAccount) {
  //         // Jika sesi aktif, arahkan ke halaman home
  //         router.replace('/home');
  //       }
  //     } catch (error) {
  //       console.log('No active session:', error.message);
  //     } finally {
  //       setIsCheckingSession(false);
  //     }
  //   };

  //   checkSession();
  // }, []);

  return (
    <SafeAreaView style={{backgroundColor:theme.colors.primary, height:'100%'}}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={{fontSize: 30, color: theme.colors.secondary.DEFAULT, fontFamily:'Poppins-Bold'}}>
            SmartLab
          </Text>
          <Text style={styles.text}>
            Log in to SmartLab
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
            <Text style={{color:theme.colors.black.DEFAULT, fontSize:15, fontFamily:'Poppins-Regular'}}>
              Don't have account? {''}
            </Text>
            <Link href="/sign-up" style={{color:theme.colors.secondary[200], fontSize:15, fontFamily:'Poppins-SemiBold'}}>
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
  title: {
    fontSize: screenWidth > 768 ? 36 : 30,
    color: theme.colors.secondary.DEFAULT,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  text:{
    fontSize:22,
    color: theme.colors.black.DEFAULT,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 14,
    width: '100%',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 2
  },
  signUpText: {
    color: theme.colors.black.DEFAULT,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  signUpLink: {
    color: theme.colors.secondary[200],
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    textDecorationLine: 'underline',
  }
})

export default SignIn