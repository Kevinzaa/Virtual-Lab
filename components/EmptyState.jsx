import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { images } from '../constants'
import theme from '../style'
import CustomButton from './CustomButton'
import { router } from 'expo-router'
import { useWindowDimensions } from 'react-native';

const EmptyState = ({title, subtitle, isWeb}) => {
  const { width: screenWidth } = useWindowDimensions();

  return (
    <View style={[styles.container, isWeb && styles.webContainer]}>
      <Image 
        source={images.empty}
        style={[styles.emptyImage, isWeb && styles.webEmptyImage]}
      />
      <Text style={[styles.title, isWeb && styles.webTitle]}>
        {title}
      </Text>
      <Text style={[styles.subtitle, isWeb && styles.webSubtitle]}>
        {subtitle}
      </Text>

      <CustomButton
        title="Create video"
        handlePress={() => router.push('/create')}
        containerStyles={[styles.buttonContainer, isWeb && styles.webButtonContainer]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    flex: 1,
  },
  webContainer: {
    paddingHorizontal: 40,
  },
  emptyImage: {
    resizeMode: 'contain',
    width: 270,
    height: 215,
    marginBottom: 20,
  },
  webEmptyImage: {
    width: 350,
    height: 280,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    color: theme.colors.secondary.DEFAULT,
    fontSize: 24,
    marginBottom: 10,
  },
  webTitle: {
    fontSize: 32,
  },
  subtitle: {
    fontFamily: 'Poppins-Medium',
    color: theme.colors.secondary.DEFAULT,
    fontSize: 14,
    marginBottom: 24,
  },
  webSubtitle: {
    fontSize: 16,
  },
  buttonContainer: {
    width: '90%',
    marginVertical: 24,
  },
  webButtonContainer: {
    width: '50%',
    maxWidth: 300,
  },
});

export default EmptyState;