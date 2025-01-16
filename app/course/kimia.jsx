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
import { getAllPosts } from '../../lib/appwrite';
import { icons, images } from '../../constants';
import { router } from 'expo-router';

const Kimia = () => {
  const { data: posts, refetch } = useAppWrite(getAllPosts);
  const [refreshing, setRefreshing] = useState(false);

  const filteredVideos =
    posts?.filter((post) => post.title.toLowerCase().includes('kimia')) ?? [];

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Content Section */}
      <FlatList
        data={filteredVideos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <View>
            {/* Header Section */}
            <View style={styles.header}>
              <ImageBackground
                source={images.kimia}
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

            {/* Content Section */}
            <View style={styles.content}>
              <Text style={styles.title}>Kimia Dasar</Text> 
              <Text style={styles.subtitle}> 
                Pelajari konsep dasar ilmu kimia melalui video-video interaktif dan
                informatif!
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}> 
              Belum ada video terkait Kimia
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

export default Kimia;