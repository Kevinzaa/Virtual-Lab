import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import theme from '../../style'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import {getUserPosts, signOut} from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppWrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons, images } from '../../constants'
import InfoBox from '../../components/InfoBox'
import {router} from 'expo-router'

const Profile = () => {

  const {user, setUser, setIsLoggedIn} = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace('/sign-in')
  }

  const {data:posts} = useAppWrite(
    () => getUserPosts(user.$id)
  );

  return (
    <SafeAreaView style={{backgroundColor:theme.colors.primary, height:'100%'}}>
      <FlatList
        style={{marginTop: 50}}
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <VideoCard video={item}/>
        )}

        ListHeaderComponent={() => (
          <View style={{width:'100%', justifyContent:'center',alignItems:'center', marginTop:24, marginBottom:48, paddingHorizontal:24}}>
            <TouchableOpacity
              style={{width:'100%', alignItems:'flex-end', marginBottom:8}}
              onPress={logout}
            >
              <Image source={icons.logout}
              resizeMode='contain'
              style={{width:24, height:24, marginBottom:24}}/>
            </TouchableOpacity>

            <View style={{width:64, height:64, borderWidth:1, borderColor:theme.colors.secondary.DEFAULT, borderRadius:8, justifyContent:'center', alignItems:'center'}}>
              <Image 
              source={{uri: user?.avatar}}
              style={{width:'90%', height:'90%', borderRadius:8}}
              resizeMode='cover'
              />
            </View> 

            <InfoBox
              title = {user?.username}
              subtitle={posts.length + ' videos'}
              containerStyles = {{marginTop:16}}
              titleStyles = {{fontSize:24}}
            />

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

export default Profile