import { View, Text, ScrollView, StyleSheet, Alert, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants"
import theme from '../../style'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser, signOut, getAccount } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

// const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const screenWidth = Dimensions.get('window').width;

const SignUp = () => {
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      // Check for an active session
      // const currentAccount = await getAccount();
      // if (currentAccount) {
      //   // If there's an active session, log out first
      //   await signOut();
      // }

      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);
      router.replace('/home');
    } catch (error) {
      console.error('Sign Up Error:', error);
      Alert.alert('Error', `Sign up failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={{backgroundColor: theme.colors.primary, height: '100%'}}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>SmartLab</Text>
          <Text style={styles.text}>Sign up to SmartLab</Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({...form, username: e})}
            otherStyles={{marginTop: 24}}
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})}
            otherStyles={{marginTop: 7}}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})}
            otherStyles={{marginTop: 7}}
          />

          <CustomButton
            title="Sign up"
            containerStyles={styles.button}
            handlePress={submit}
            isLoading={isSubmitting}
          />

          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <Link href="/sign-in" style={styles.signInLink}>Sign In</Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: screenWidth > 768 ? 36 : 30,
    color: theme.colors.secondary.DEFAULT,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  text: {
    fontSize: screenWidth > 768 ? 24 : 22,
    color: theme.colors.black.DEFAULT,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 14,
    width: '100%',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 2
  },
  signInText: {
    color: theme.colors.black.DEFAULT,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  signInLink: {
    color: theme.colors.secondary[200],
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    textDecorationLine: 'underline',
  }
})

export default SignUp