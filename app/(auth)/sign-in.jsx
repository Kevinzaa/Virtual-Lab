import { View, Text, ScrollView, StyleSheet, Alert, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { getCurrentUser, signIn } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import theme from '../../style';

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({ email: '', password: '' });

  // Use dimensions to determine layout
  const { width: screenWidth } = useWindowDimensions();
  const isWeb = screenWidth >= 768; // Define breakpoint for web layout

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

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.primary, height: '100%' }}>
      <ScrollView contentContainerStyle={isWeb ? styles.webScrollContainer : null}>
        <View style={[styles.container, isWeb && styles.webContainer]}>
          <Text style={[styles.title, isWeb && styles.webTitle]}>
            SmartLab
          </Text>
          <Text style={[styles.text, isWeb && styles.webText]}>
            Log in to SmartLab
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={{ marginTop: 24 }}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={{ marginTop: 7 }}
          />
          <CustomButton
            title="Sign in"
            containerStyles={isWeb ? styles.webButton : styles.button}
            handlePress={submit}
            isLoading={isSubmitting}
          />
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Don't have an account?{' '}
            </Text>
            <Link href="/sign-up" style={styles.signUpLink}>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    minHeight: '85%',
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  webContainer: {
    maxWidth: 500,
    padding: 32,
    backgroundColor: theme.colors.white.DEFAULT,
    borderRadius: 16,
    elevation: 5, // Shadow for web
  },
  title: {
    fontSize: 30,
    color: theme.colors.secondary.DEFAULT,
    fontFamily: 'Poppins-Bold',
    textAlign: 'left', // Default alignment for mobile
  },
  webTitle: {
    textAlign: 'center', // Override alignment for web
  },
  text: {
    fontSize: 22,
    color: theme.colors.black.DEFAULT,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
    textAlign: 'left',
  },
  webText: {
    textAlign: 'center',
    fontSize: 24,
  },
  button: {
    marginTop: 14,
    width: '100%',
  },
  webButton: {
    marginTop: 14,
    width: 300,
    alignSelf: 'center',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 2,
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
  },
  webScrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignIn;
