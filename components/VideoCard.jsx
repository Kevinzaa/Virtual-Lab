import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import theme from '../style'
import { icons } from '../constants'
import { ResizeMode, Video } from 'expo-av'

const VideoCard = ({video : {title, thumbnail, video, creator:{username, avatar}}}) => {

    const [play, setPlay] = useState(false);

    return (
    <View style={{flexDirection:'column', alignItems:'center', paddingHorizontal:16, marginBottom:56}}>
      <View style={{flexDirection:'row', gap:12, alignItems:'flex-start'}}>
        <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row', flex:1}}>
            <View style={{width:46, height:46, borderRadius:8, borderWidth:1, borderColor:theme.colors.secondary.DEFAULT,justifyContent:'center', alignItems:'center', padding:2}}>
                <Image 
                    source={{uri: avatar}}
                    style={{width:'100%', height:'100%', borderRadius:6}}
                    resizeMode='cover'
                />
            </View>

            <View style={{justifyContent:'center', flex:1, marginLeft:12, rowGap:1}}>
                <Text style={{color:theme.colors.white.DEFAULT, fontFamily:'Poppins-SemiBold', fontSize:14}} numberOfLines={1}>
                    {title}
                </Text>
                <Text style={{fontSize:14, color:theme.colors.gray[100]}} numberOfLines={1}>
                    {username}
                </Text>
            </View>
        </View>

        <View style={{paddingTop:2}}>
            <Image
                style={{width:20, height:20, marginVertical:8}}
                source={icons.menu}
                resizeMode='contain'
            />
        </View>
      </View>


      {play ? (
        <Video
        source={{ uri: video }}
        style={{
            width: '100%',
            height: 240,
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
                width: '100%',
                aspectRatio: 16 / 10, // Memastikan rasio aspek 16:9
                borderRadius: 16,
                marginTop: 9,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden', // Memastikan gambar tidak keluar dari container
            }}
            onPress={() => setPlay(true)}
        >
            <Image
                source={{uri: thumbnail}}
                style={{
                    width: '100%',
                    height: '100%',
                }}
                resizeMode='cover'
            />
            <Image 
                source={icons.play}
                style={{
                    width: 24,
                    height: 24,
                    position: 'absolute',
                }}
                resizeMode='contain'
            />
        </TouchableOpacity>
      )}

    </View>
  )
}

export default VideoCard
