import { View, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import {React, useState, useCallback } from 'react';
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

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      style={{
        marginRight: 16,
      }}
      animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          style={{
            width: 190,
            height: 288,
            borderRadius: 35,
            marginVertical: 20,
            backgroundColor: theme.colors.black.DEFAULT,
          }}
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
          style={{
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            style={{
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
            }}
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            style={{
              width: 35,
              height: 35,
              position: 'absolute',
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = useCallback(({ viewableItems }) => { // Gunakan useCallback
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item);
    }
  }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
      horizontal
      showsHorizontalScrollIndicator={false} 
    />
  );
};

export default Trending;
