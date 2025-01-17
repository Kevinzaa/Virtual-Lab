import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import theme from '../style';

const CourseCard = ({ imageSource, courseTitle, deskripsi, navigateTo, isWeb }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(navigateTo);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.cardContainer, isWeb && styles.webCardContainer]}>
      <Image source={imageSource} style={[styles.courseImage, isWeb && styles.webCourseImage]} resizeMode="cover" />
      <View style={styles.textContainer}>
        <Text style={[styles.courseTitle, isWeb && styles.webCourseTitle]}>{courseTitle}</Text>
        <Text style={[styles.deskripsi, isWeb && styles.webDeskripsi]}>{deskripsi}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white.DEFAULT,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 4,
  },
  webCardContainer: {
    // Web-specific styles if needed
    width: '80%',
    maxWidth: 600,
    marginHorizontal: 'auto',
  },
  courseImage: {
    width: 100,
    height: 100,
  },
  webCourseImage: {
    width: 150,
    height: 150,
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  courseTitle: {
    fontFamily: 'Poppins-Bold',
    color: theme.colors.secondary.DEFAULT,
    fontSize: 16,
  },
  webCourseTitle: {
    fontSize: 20,
  },
  deskripsi: {
    fontFamily: 'Poppins-Regular',
    color: theme.colors.secondary.LIGHT,
    fontSize: 14,
    marginTop: 5,
  },
  webDeskripsi: {
    fontSize: 16,
  },
});

export default CourseCard;