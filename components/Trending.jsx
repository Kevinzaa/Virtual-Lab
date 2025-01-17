import { View, FlatList, TouchableOpacity, ImageBackground, Image, useWindowDimensions, StyleSheet } from 'react-native';
import React, { useState, useCallback } from 'react';
import theme from '../style';
import * as Animatable from 'react-native-animatable';
import { icons } from '../constants';
import { Video, ResizeMode } from 'expo-av';

const zoomIn = {
  0: { scale: 0.9 },
  1: { scale: 1 },
};

const zoomOut = {
  0: { scale: 1 },
  1: { scale: 0.9 },
};

const TrendingItem = ({ activeItem, item, isWeb }) => {
  const [play, setPlay] = useState(false);
  const { width: screenWidth } = useWindowDimensions();

  return (
    <Animatable.View
      style={styles.trendingItem}
      animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          style={[styles.video, isWeb && styles.webVideo]}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          style={styles.touchableOpacity}
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            style={[styles.trendingImage, isWeb && styles.webTrendingImage]}
            resizeMode="cover"
          >
          </ImageBackground>
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts, isWeb }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item);
    }
  }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} isWeb={isWeb} />}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: isWeb ? 200 : 170 }}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.flatList}
    />
  );
};

const styles = StyleSheet.create({
  trendingItem: {
    marginRight: 16,
  },
  touchableOpacity: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 190,
    height: 288,
    borderRadius: 35,
    marginVertical: 20,
    backgroundColor: theme.colors.black.DEFAULT,
  },
  webVideo: {
    width: 250,
    height: 384,
  },
  trendingImage: {
    width: 190,
    height: 288,
    borderRadius: 35,
    marginVertical: 20,
    overflow: 'hidden',
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  webTrendingImage: {
    width: 250,
    height: 384,
  },
  playIcon: {
    width: 35,
    height: 35,
    position: 'absolute',
  },
  webPlayIcon: {
    width: 45,
    height: 45,
  },
  flatList: {
    // Add any necessary styles for FlatList here
  },
});

export default Trending;