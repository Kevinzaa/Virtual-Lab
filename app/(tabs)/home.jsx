import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import theme from "../../style";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import CustomButton from "../../components/CustomButton";
import CourseCard from "../../components/CourseCard"; // Import CourseCard
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import * as Device from 'expo-device';

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const {user, setUser, setIsLoggedIn} = useGlobalContext();

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
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        
        {/* Header Section */}
        <View style={{ marginBottom: 20, marginTop: 40 }}>
          <Text style={{ fontFamily: "Poppins-Medium", color: theme.colors.secondary.DEFAULT, fontSize: 14, marginBottom: -5 }}>
            Welcome Back
          </Text>
          <Text style={{ fontFamily: "Poppins-SemiBold", color: theme.colors.secondary.DEFAULT, fontSize: 24 }}>
            {user?.username}
          </Text>
          <Text style={{ fontFamily: "Poppins-Regular", color: theme.colors.secondary.LIGHT, fontSize: 14, marginTop: 4,marginBottom:-20 }}>
            {formattedDate}
          </Text>
        </View>

        <View style={styles.separator} />


        {/* Search Section */}
        <SearchInput />

        {/* Quote Section */}
        <View style={{ backgroundColor: theme.colors.secondary.DEFAULT, padding: 15, borderRadius: 10, marginVertical: 20 }}>
          <Text style={{ color: theme.colors.secondary[300], fontFamily: "Poppins-Light", fontSize: 16 }}>
            "The roots of education are bitter, but the fruit is sweet." – Aristotle
          </Text>
        </View>

        {/* Recommended Courses Section */}
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              color: theme.colors.secondary.DEFAULT,
              fontSize: 18,
              marginBottom: 10,
            }}
          >
            Rekomendasi Mata Kuliah
          </Text>

          {/* Course Cards */}
          <CourseCard
            imageSource={images.kimia} 
            courseTitle="Kimia Dasar"
            deskripsi= "Mempelajari tentang struktur, sifat, dan reaksi kimia"
            navigateTo="../course/kimia"
          />
          <CourseCard
            imageSource={images.python}
            courseTitle="Pengenalan Komputasi"
            deskripsi = "Memberikan pemahaman tentang dasar ilmu komputer"
            navigateTo="../course/pengkom" 
          />
          <CourseCard
            imageSource={images.fisika} 
            courseTitle="Fisika Dasar"
            deskripsi= "Mempelajari konsep dasar tentang gerak, energi, dan gaya"
            navigateTo="../course/fisika" 
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
    height: 1, // Menentukan tinggi garis
    backgroundColor: theme.colors.secondary[200], // Warna garis
    marginVertical: 20, // Jarak di atas dan bawah garis
  },
});

export default Home;
