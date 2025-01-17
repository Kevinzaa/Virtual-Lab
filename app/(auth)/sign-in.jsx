import { View, Text, ScrollView, StyleSheet, Alert, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants"
import theme from '../../style'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { getAccount, getCurrentUser, signIn, signOut } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider';

// const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const screenWidth = Dimensions.get('window').width;

const SignIn = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      // const currentAccount = await getAccount();
      // if (currentAccount) {
      //   await signOut();
      // }

      // Now attempt to sign in
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
      console.error('Sign In Error:', error);
      if (error.message.includes('User (role: guests) missing scope')) {
        Alert.alert('Error', 'Sign in failed. Please check your credentials or contact support.');
      } else {
        Alert.alert('Error', error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: theme.colors.primary, height: '100%'}}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>SmartLab</Text>
          <Text style={styles.text}>Log in to SmartLab</Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})}
            otherStyles={{marginTop: 24}}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})}
            otherStyles={{marginTop: 7}}
          />

          <CustomButton
            title="Sign in"
            containerStyles={styles.button}
            handlePress={submit}
            isLoading={isSubmitting}
          />

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <Link href="/sign-up" style={styles.signUpLink}>Sign Up</Link>
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
    textAlign:'left',
  },
  text: {
    fontSize: screenWidth > 768 ? 24 : 22,
    color: theme.colors.black.DEFAULT,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
    textAlign: 'left',
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