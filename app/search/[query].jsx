import { View, Text, SafeAreaView, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import theme from '../../style'
import {images} from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import {searchPosts} from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppWrite'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {

  const {query} = useLocalSearchParams();
  const {data:posts, refetch} = useAppWrite(
    () => searchPosts(query)
  );

  console.log(query,posts)

  useEffect(() => {
    refetch
  }, [query])

  return (
    <SafeAreaView style={{backgroundColor:theme.colors.primary, height:'100%'}}>
      <FlatList
        style={{marginTop: 50}}
        // data={[]}
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <VideoCard video={item}/>
          // <Text style={{fontSize:25, color:theme.colors.white.DEFAULT}}>{item.title}</Text>
        )}

        ListHeaderComponent={() => (
          <View style={{marginTop:24, paddingHorizontal:16}}>
            
            <Text style={{fontFamily:'Poppins-Medium', color:theme.colors.gray[100], fontSize:14}}>
              Search Results
            </Text>
            <Text style={{fontFamily:'Poppins-SemiBold', color:theme.colors.white.DEFAULT, fontSize:24}}>
              {query}
            </Text>
            
            <View style={{marginTop:24, marginBottom:32}}>
              <SearchInput initialQuery = {query}/>
            </View>

          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState
            title = "No videos found"
            subtitle = "Tidak ada video yang cocok dengan kata kunci pencarian"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Search