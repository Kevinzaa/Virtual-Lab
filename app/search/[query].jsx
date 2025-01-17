import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import React, { useEffect } from 'react';
import theme from '../../style';
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';
import { searchPosts } from '../../lib/appwrite';
import useAppWrite from '../../lib/useAppWrite';
import VideoCard from '../../components/VideoCard';
import { useLocalSearchParams } from 'expo-router';
import { icons } from '../../constants';
import { router } from 'expo-router';

const Search = () => {
  const { width: screenWidth } = useWindowDimensions();
  const isWeb = screenWidth >= 768; // Check if screen width indicates web view

  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppWrite(() => searchPosts(query));

  console.log(query, posts);

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.primary, height: '100%' }}>
      <FlatList
        style={{ marginTop: 50 }}
        contentContainerStyle={styles.contentContainer(isWeb)}
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} isWeb={isWeb} />}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            {/* Row for Icon and Text */}
            <View style={styles.headerRow}>
              {/* Back Button */}
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.push('/')}
              >
                <Image
                  source={icons.back}
                  style={styles.backIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* Search Results Text */}
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerSubtitle}>Search Results</Text>
                <Text style={styles.headerTitle}>{query}</Text>
              </View>
            </View>

            {/* Search Input */}
            <View style={styles.searchInputContainer}>
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Tidak ada video yang cocok dengan kata kunci pencarian"
            isWeb={isWeb} // Pass isWeb to EmptyState
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: (isWeb) => ({
    paddingHorizontal: isWeb ? 40 : 16,
    paddingBottom: 24,
  }),
  headerContainer: {
    marginTop: 2,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  headerTextContainer: {
    marginLeft: 10,
  },
  headerSubtitle: {
    fontFamily: 'Poppins-Medium',
    color: theme.colors.secondary.DEFAULT,
    fontSize: 14,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    color: theme.colors.secondary.DEFAULT,
    fontSize: 24,
  },
  searchInputContainer: {
    marginTop: 24,
    marginBottom: 32,
  },
});

export default Search;
