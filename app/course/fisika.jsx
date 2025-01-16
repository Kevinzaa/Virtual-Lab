import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import theme from '../../style';
import VideoCard from '../../components/VideoCard';
import useAppWrite from '../../lib/useAppWrite';
import { getAllPosts } from '../../lib/appwrite'; // Memastikan data diambil dari API
import { icons, images } from '../../constants';
import { router } from 'expo-router';

const Fisika = () => {
  const { data: posts, refetch } = useAppWrite(getAllPosts); // Mendapatkan semua post
  const [refreshing, setRefreshing] = useState(false);

  // Filter video yang terkait dengan "Kimia"
  const filteredVideos =
    posts?.filter((post) => post.title.toLowerCase().includes('fisika')) ?? [];

  // Fungsi untuk refresh data
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <ImageBackground
          source={images.fisika} // Ganti dengan foto yang Anda gunakan
          style={styles.backgroundImage}
          resizeMode="cover" // Atur agar gambar sesuai dengan ukuran container
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push('/')}
          >
            <Image
              source={icons.leftArrow}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {/* <Image
            source={images.chemistry}
            style={styles.image}
            resizeMode="contain"
          /> */}
        </ImageBackground>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Fisika Dasar</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Pelajari konsep dasar ilmu kimia melalui video-video interaktif dan
          informatif!
        </Text>

        {/* Video List */}
        <FlatList
          style={{ marginTop: 10 }}
          data={filteredVideos}
          keyExtractor={(item) => item.$id} // Gunakan $id sebagai key
          renderItem={({ item }) => <VideoCard video={item} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={() => (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                Belum ada video terkait Fisika
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  header: {
    height: 250, // Tinggi header
    overflow: 'hidden', // Agar gambar mengikuti radius
  },
  backgroundImage: {
    flex: 1, // Agar gambar menutupi seluruh area header
    justifyContent: 'center', // Memastikan konten berada di tengah secara vertikal
    alignItems: 'center', // Memastikan konten berada di tengah secara horizontal
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 30,
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  content: {
    padding: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: theme.colors.secondary.DEFAULT,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.secondary.DEFAULT,
    marginBottom: 20,
  },
  emptyState: {
    marginTop: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.secondary[200],
    fontFamily: 'Poppins-Regular',
  },
});

export default Fisika;
