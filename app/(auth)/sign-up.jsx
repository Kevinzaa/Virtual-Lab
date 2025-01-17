import { View, Text, ScrollView, StyleSheet, Alert, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../style';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Use dimensions to determine layout
  const { width: screenWidth } = useWindowDimensions();
  const isWeb = screenWidth >= 768; // Define breakpoint for web layout

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);
      router.replace('/home');
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
            Sign up to SmartLab
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles={{ marginTop: 24 }}
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={{ marginTop: 7 }}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={{ marginTop: 7 }}
          />
          <CustomButton
            title="Sign up"
            containerStyles={isWeb ? styles.webButton : styles.button}
            handlePress={submit}
            isLoading={isSubmitting}
          />
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>
              Already have an account?{' '}
            </Text>
            <Link href="/sign-in" style={styles.signInLink}>
              Sign In
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
    textAlign: 'left', // Default for mobile
  },
  webTitle: {
    textAlign: 'center', // Override for web
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
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 2,
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
  },
  webScrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignUp;
