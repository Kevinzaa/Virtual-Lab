import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import { React, useState } from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import theme from '../../style'
import {Video,ResizeMode} from 'expo-av'
import { icons } from '../../constants'
import CustomButton from '../../components/CustomButton'
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import {router} from 'expo-router'
import { createVideo } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const Create = () => {

  const {user} = useGlobalContext();

  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title : '',
    video : null,
    thumbnail : null,
    prompt : ''
  });

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes : selectType === 'image' 
      ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4,3],
      quality: 1,
    })

    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0]})
      }

      if (selectType === 'video') {
        setForm({ ...form, video: result.assets[0]})
      }
    }
  }

  const submit = async () => {
    if (!form.prompt || !form.title || !form.thumbnail || !form.video){
      return Alert.alert("Pleade fill in all the fields")
    }

    setUploading(true);

    try {
      await createVideo({
        ...form, userId: user.$id
      })
      Alert.alert('Success', 'Post uploaded successfully')
      router.push('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally{
      setForm({
        title : '',
        video : null,
        thumbnail : null,
        prompt : ''
      })

      setUploading(false);
    }
  }

  return (
    <SafeAreaView style={{backgroundColor:theme.colors.primary, height:'100%'}}>
      <ScrollView style={{paddingHorizontal:16, paddingVertical:24}}>
        
        <Text style={{fontSize:24, color:theme.colors.white.DEFAULT, fontFamily:'Poppins-SemiBold'}}>
          Upload Video
        </Text>

        <FormField
          title = "Video title"
          value = {form.title}
          placeholder= "Give your video a catch title"
          handleChangeText={(e) => setForm({ ...form,
            title: e
          })}
          otherStyles = {{marginTop: 40}}
        />

        <View style={{marginTop:14, marginVertical:4}}>
          <Text style={{fontSize:16, color:theme.colors.gray[100], fontFamily:'Poppins-Medium'}}>
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <Video 
                source={{uri : form.video.uri}}
                style={{width:'100%', height:'256', borderWidth:10, borderColor:theme.colors.black[100]}}
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View style={{width:'100%', height:160, paddingHorizontal:8, backgroundColor:theme.colors.black[100], borderRadius:12, justifyContent:'center', alignItems:'center'}}>
                <View style={{width:56, height:56, borderWidth:1, borderStyle:'dashed', borderColor:theme.colors.gray[100], justifyContent:'center', alignItems:'center', borderRadius:12}}>
                  <Image 
                    source = {icons.upload}
                    resizeMode = "contain"
                    style = {{width:35, height:35}}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={{marginTop:28, paddingVertical:8}}>
          <Text style={{fontSize:16, color:theme.colors.gray[100], fontFamily:'Poppins-Medium'}}>
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image 
                source={{uri: form.thumbnail.uri}}
                resizeMode='cover'
                style={{width:'100%', height:256, borderRadius:12}}
              />
            ) : (
              <View style={
                {
                  width: '100%',      
                  height: 64,         
                  paddingHorizontal: 16, 
                  backgroundColor: theme.colors.black[100], 
                  borderRadius: 16,    
                  justifyContent: 'center', 
                  alignItems: 'center',     
                  borderWidth: 2,    
                  borderColor: theme.colors.black[200], 
                  flexDirection: 'row', 
                }}>
                <Image 
                  source = {icons.upload}
                  resizeMode = "contain"
                  style = {{width:20, height:20}}
                />
                <Text style={{fontSize:16, color:theme.colors.gray[100], fontFamily:"Poppins-Medium", marginLeft:10}}>
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title = "AI Prompt"
          value = {form.prompt}
          placeholder= "The prompt you used to create this video"
          handleChangeText={(e) => setForm({ ...form,
            prompt: e
          })}
          otherStyles = {{marginTop: 28}}
        />

        <CustomButton
         title="Submit and Publish"
         handlePress={submit}
         containerStyles = {{marginTop: 28, marginBottom:50}}
         isLoading={uploading}
        />
        
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create