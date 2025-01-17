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
  useWindowDimensions
} from 'react-native';
import theme from '../../style';
import VideoCard from '../../components/VideoCard';
import useAppWrite from '../../lib/useAppWrite';
import { getAllPosts } from '../../lib/appwrite';
import { icons, images } from '../../constants';
import { router } from 'expo-router';

const Pengkom = () => {
  const { width: screenWidth } = useWindowDimensions();
  const isWeb = screenWidth >= 768;

  const { data: posts, refetch } = useAppWrite(getAllPosts);
  const [refreshing, setRefreshing] = useState(false);

  const filteredVideos =
    posts?.filter((post) => post.title.toLowerCase().includes('komputasi')) ?? [];

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredVideos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} isWeb={isWeb} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <ImageBackground
                source={images.python}
                style={styles.backgroundImage}
                resizeMode="cover"
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
              </ImageBackground>
            </View>

            <View style={styles.content}>
              <Text style={[styles.title, isWeb && styles.webTitle]}>Pengenalan Komputasi</Text>
              <Text style={[styles.subtitle, isWeb && styles.webSubtitle]}>
                Pelajari konsep dasar ilmu komputer melalui video-video interaktif dan informatif!
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, isWeb && styles.webEmptyText]}>
              Belum ada video terkait Pengenalan Komputasi
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  header: {
    height: 200,
    overflow: 'hidden',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  webTitle: {
    fontSize: 36,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.secondary.DEFAULT,
    marginBottom: 20,
  },
  webSubtitle: {
    fontSize: 18,
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
  webEmptyText: {
    fontSize: 20,
  },
});

export default Pengkom;