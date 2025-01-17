import { View, Text, SafeAreaView, FlatList, StyleSheet, RefreshControl, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import theme from '../../style'
import {images} from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppWrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import { StatusBar } from 'expo-status-bar';

const Video = () => {

  const { width: screenWidth } = useWindowDimensions();
  const isWeb = screenWidth >= 768;

  const {data: posts, refetch} = useAppWrite(getAllPosts);
  const {data: latestPosts} = useAppWrite(getLatestPosts);
  const [refreshing, setRefreshing] = useState(false);
  const {user, setUser, setIsLoggedIn} = useGlobalContext();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" translucent={true} backgroundColor={theme.colors.primary} />
      <FlatList
        style={styles.flatList}
        contentContainerStyle={styles.contentContainer(isWeb)}
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <VideoCard video={item} isWeb={isWeb}/>
        )}
        ListHeaderComponent={() => (
          <View style={[styles.headerContainer, isWeb && styles.webHeaderContainer]}>
            <View style={{justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'row', marginBottom: 5}}>
              <View>
                <Text style={[styles.title, isWeb && styles.webTitle]}>
                  SmartLab
                </Text>
              </View>
            </View>

            <View style={styles.separator} />
              
            <View style={[styles.trendingSection, isWeb && styles.webTrendingSection]}>
              <Text style={[styles.subtitle, isWeb && styles.webSubtitle]}>
                Latest Videos
              </Text>
              <Trending posts={latestPosts ?? []} isWeb={isWeb}/>
            </View>

            <View style={styles.separator} />

            <Text style={[styles.subtitle, isWeb && styles.webSubtitle]}>
              All Videos
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Be the first one to upload a video"
            isWeb={isWeb}
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  flatList: {
    // No marginTop, as we're handling it with contentContainerStyle
  },
  contentContainer: (isWeb) => ({
    paddingTop: isWeb ? 80 : 50, // Adjust this to your need, ensuring no extra space at the top
    paddingBottom: 24,
    paddingHorizontal: isWeb ? 40 : 16,
  }),
  headerContainer: {
    marginVertical: 20,
    gap: 24,
  },
  webHeaderContainer: {
    // Web-specific adjustments if needed
  },
  title: {
    fontFamily: 'Poppins-Bold',
    color: theme.colors.secondary.DEFAULT,
    fontSize: 24,
    marginBottom: -20,
  },
  webTitle: {
    fontSize: 36,
  },
  subtitle: {
    color: theme.colors.secondary.DEFAULT,
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 3,
  },
  webSubtitle: {
    fontSize: 18,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.secondary[200],
    marginVertical: 20,
  },
  trendingSection: {
    width: '100%', 
    flex: 1, 
    paddingTop: 5, 
    paddingBottom: 8, 
    marginTop: -30,
  },
  webTrendingSection: {
    // Web-specific adjustments if needed
  },
});

export default Video;