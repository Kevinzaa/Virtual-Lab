import { View, Text, SafeAreaView, FlatList, Image, RefreshControl} from 'react-native'
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

const Home = () => {

  const {data:posts, refetch} = useAppWrite(getAllPosts);
  const {data:latestPosts} = useAppWrite(getLatestPosts);
  const [refreshing, setRefreshing] = useState(false);
  const {user, setUser, setIsLoggedIn} = useGlobalContext();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  // console.log(posts)

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
          <View style={{marginVertical:24, paddingHorizontal:16, gap:24}}>

            <View style={{justifyContent:'space-between', alignItems:'flex-start', flexDirection:'row', marginBottom:5}}>
              <View>
                <Text style={{fontFamily:'Poppins-Medium', color:theme.colors.gray[100], fontSize:14}}>
                  Welcome Back
                </Text>
                <Text style={{fontFamily:'Poppins-SemiBold', color:theme.colors.white.DEFAULT, fontSize:24}}>
                  Kevinza
                </Text>
              </View>

              <View style={{marginTop:8}}>
                <Image
                  source={images.logoSmall}
                  style={{width: 50, height: 50}}
                  resizeMode='contain'
                />
              </View>
            </View>
              
            <SearchInput/>

            <View style={{width:'100%', flex:1, paddingTop:5, paddingBottom:8}}>
              <Text style={{color:theme.colors.gray[100], fontSize:15, fontFamily:'Poppins-Regular', marginBottom:3}}>
                Latest Videos
              </Text>

              <Trending posts ={latestPosts ?? []}/>
            </View>
          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState
            title = "No videos found"
            subtitle = "Be the first one to uploud a video"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}

      />
    </SafeAreaView>
  )
}

export default Home