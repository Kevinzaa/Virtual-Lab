import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import theme from "../../style";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import CustomButton from "../../components/CustomButton";
import CourseCard from "../../components/CourseCard";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import * as Device from 'expo-device';

const Home = () => {
  const { width: screenWidth } = useWindowDimensions();
  const isWeb = screenWidth >= 768;

  const [refreshing, setRefreshing] = useState(false);
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.primary, height: "100%" }}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: isWeb ? 40 : 16, paddingVertical: 20 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        
        {/* Header Section */}
        <View style={{ marginBottom: 20, marginTop: 40 }}>
          <Text style={[styles.welcomeText, isWeb && styles.webWelcomeText]}>
            Welcome Back
          </Text>
          <Text style={[styles.usernameText, isWeb && styles.webUsernameText]}>
            {user?.username}
          </Text>
          <Text style={[styles.dateText, isWeb && styles.webDateText]}>
            {formattedDate}
          </Text>
        </View>

        <View style={styles.separator} />

        {/* Search Section */}
        <SearchInput />

        {/* Quote Section */}
        <View style={[styles.quoteContainer, isWeb && styles.webQuoteContainer]}>
          <Text style={[styles.quoteText, isWeb && styles.webQuoteText]}>
            "The roots of education are bitter, but the fruit is sweet." – Aristotle
          </Text>
        </View>

        {/* Recommended Courses Section */}
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.recommendationTitle, isWeb && styles.webRecommendationTitle]}>
            Mata Kuliah
          </Text>

          {/* Course Cards */}
          <CourseCard
            imageSource={images.kimia} 
            courseTitle="Kimia Dasar"
            deskripsi="Mempelajari tentang struktur, sifat, dan reaksi kimia"
            navigateTo="../course/kimia"
            isWeb={isWeb}
          />
          <CourseCard
            imageSource={images.python}
            courseTitle="Pengenalan Komputasi"
            deskripsi="Memberikan pemahaman tentang dasar ilmu komputer"
            navigateTo="../course/pengkom" 
            isWeb={isWeb}
          />
          <CourseCard
            imageSource={images.fisika} 
            courseTitle="Fisika Dasar"
            deskripsi="Mempelajari konsep dasar tentang gerak, energi, dan gaya"
            navigateTo="../course/fisika" 
            isWeb={isWeb}
          />
        </View>

        {/* Action Button */}
        <CustomButton title="Explore Videos" handlePress={() => router.push("/(tabs)/video")} isLoading={false} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: theme.colors.secondary[200],
    marginVertical: 20,
  },
  welcomeText: {
    fontFamily: "Poppins-Medium",
    color: theme.colors.secondary.DEFAULT,
    fontSize: 14,
    marginBottom: -5,
  },
  webWelcomeText: {
    fontSize: 18,
  },
  usernameText: {
    fontFamily: "Poppins-SemiBold",
    color: theme.colors.secondary.DEFAULT,
    fontSize: 24,
  },
  webUsernameText: {
    fontSize: 36,
  },
  dateText: {
    fontFamily: "Poppins-Regular",
    color: theme.colors.secondary.LIGHT,
    fontSize: 14,
    marginTop: 4,
    marginBottom: -20,
  },
  webDateText: {
    fontSize: 16,
  },
  quoteContainer: {
    backgroundColor: theme.colors.secondary.DEFAULT,
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
    marginVertical: 20,
  },
  webQuoteContainer: {
    padding: 20,
  },
  quoteText: {
    color: theme.colors.secondary[300],
    fontFamily: "Poppins-Light",
    fontSize: 16,
  },
  webQuoteText: {
    fontSize: 18,
  },
  recommendationTitle: {
    fontFamily: "Poppins-SemiBold",
    color: theme.colors.secondary.DEFAULT,
    fontSize: 18,
    marginBottom: 10,
  },
  webRecommendationTitle: {
    fontSize: 24,
  },
});

export default Home;