import { View, Text, SafeAreaView, FlatList, StyleSheet, RefreshControl} from 'react-native'
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

const Video = () => {

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
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <VideoCard video={item}/>
        )}

        ListHeaderComponent={() => (
          <View style={{marginVertical:20, paddingHorizontal:16, gap:24}}>

            <View style={{justifyContent:'space-between', alignItems:'flex-start', flexDirection:'row', marginBottom:5}}>
              <View>
                <Text style={{fontFamily:'Poppins-Bold', color:theme.colors.secondary.DEFAULT, fontSize:24, marginBottom:-20}}>
                  SmartLab
                </Text>
              </View>
            </View>

            <View style={styles.separator} />
              
            {/* <SearchInput/> */}

            <View style={{width:'100%', flex:1, paddingTop:5, paddingBottom:8, marginTop:-30}}>
              <Text style={{color:theme.colors.secondary.DEFAULT, fontSize:15, fontFamily:'Poppins-SemiBold', marginBottom:3}}>
                Latest Videos
              </Text>

              <Trending posts ={latestPosts ?? []}/>
            </View>

            <View style={styles.separator} />

            <Text style={{color:theme.colors.secondary.DEFAULT, fontSize:15, fontFamily:'Poppins-SemiBold', marginBottom:3, marginTop:-20}}>
                All Videos
              </Text>
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

const styles = StyleSheet.create({
  separator: {
    height: 1, // Menentukan tinggi garis
    backgroundColor: theme.colors.secondary[200], // Warna garis
    marginVertical: 20, // Jarak di atas dan bawah garis
  },
});

export default Video