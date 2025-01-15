import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import theme from '../style';

const CourseCard = ({ imageSource, courseTitle, deskripsi, navigateTo }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(navigateTo); // Navigasi ke halaman yang dituju
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.cardContainer}>
      <Image source={imageSource} style={styles.courseImage} resizeMode="cover" />
      <View style={styles.textContainer}>
        <Text style={styles.courseTitle}>{courseTitle}</Text>
        <Text style={styles.deskripsi}>{deskripsi}</Text>
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
  courseImage: {
    width: 100,
    height: 100,
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
  deskripsi: {
    fontFamily: 'Poppins-Regular',
    color: theme.colors.secondary.LIGHT,
    fontSize: 14,
    marginTop: 5,
  },
});

export default CourseCard;
