import { View, Text, ScrollView, TouchableOpacity, Image, Alert, StyleSheet, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import theme from '../../style'
import {Video, ResizeMode} from 'expo-av'
import { icons } from '../../constants'
import CustomButton from '../../components/CustomButton'
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import {router} from 'expo-router'
import { createVideo } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const Create = () => {

  const { width: screenWidth } = useWindowDimensions();
  const isWeb = screenWidth >= 768;

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
      return Alert.alert("Please fill in all the fields")
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
    <SafeAreaView style={{backgroundColor: theme.colors.primary, height: '100%'}}>
      <ScrollView style={{ paddingHorizontal: isWeb ? 40 : 16, paddingVertical: 24 }}>
        
        <Text style={[styles.title, isWeb && styles.webTitle]}>
          Upload Video
        </Text>

        <View style={styles.separator} />

        <FormField
          title = "Video title"
          value = {form.title}
          placeholder= "Masukkan judul video mu"
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles = {{ marginTop: 40 }}
        />

        <View style={{ marginTop: 14, marginVertical: 4 }}>
          <Text style={[styles.subtitle, isWeb && styles.webSubtitle]}>
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <Video 
                source={{uri : form.video.uri}}
                style={[styles.video, isWeb && styles.webVideo]}
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View style={[styles.uploadContainer, isWeb && styles.webUploadContainer]}>
                <View style={styles.uploadIconContainer}>
                  <Image 
                    source = {icons.upload}
                    resizeMode = "contain"
                    style = {{width: 35, height: 35}}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 28, paddingVertical: 8 }}>
          <Text style={[styles.subtitle, isWeb && styles.webSubtitle]}>
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image 
                source={{uri: form.thumbnail.uri}}
                resizeMode='cover'
                style={[styles.thumbnail, isWeb && styles.webThumbnail]}
              />
            ) : (
              <View style={[styles.chooseFileContainer, isWeb && styles.webChooseFileContainer]}>
                <Image 
                  source = {icons.upload}
                  resizeMode = "contain"
                  style = {{width: 20, height: 20}}
                />
                <Text style={styles.chooseFileText}>
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title = "Description"
          value = {form.prompt}
          placeholder= "Deskripsi video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles = {{ marginTop: 28 }}
        />

        <CustomButton
         title="Submit and Publish"
         handlePress={submit}
         containerStyles = {{ marginTop: 28, marginBottom: 50 }}
         isLoading={uploading}
        />
        
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: theme.colors.secondary[200],
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    color: theme.colors.secondary.DEFAULT,
    fontFamily: 'Poppins-SemiBold',
  },
  webTitle: {
    fontSize: 36,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.secondary.DEFAULT,
    fontFamily: 'Poppins-Medium',
  },
  webSubtitle: {
    fontSize: 20,
  },
  video: {
    width: '100%',
    height: 256,
    borderWidth: 10,
    borderColor: theme.colors.black[100],
  },
  webVideo: {
    height: 384,
  },
  uploadContainer: {
    width: '100%',
    height: 160,
    paddingHorizontal: 8,
    backgroundColor: theme.colors.white.DEFAULT,
    borderColor: theme.colors.secondary[100],
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webUploadContainer: {
    height: 240,
  },
  uploadIconContainer: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.colors.secondary.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  thumbnail: {
    width: '100%',
    height: 256,
    borderRadius: 12,
  },
  webThumbnail: {
    height: 384,
  },
  chooseFileContainer: {
    width: '100%',      
    height: 64,         
    paddingHorizontal: 16, 
    backgroundColor: theme.colors.white.DEFAULT, 
    borderRadius: 16,    
    justifyContent: 'center', 
    alignItems: 'center',     
    borderWidth: 1,    
    borderColor: theme.colors.secondary[100], 
    flexDirection: 'row', 
  },
  webChooseFileContainer: {
    height: 80,
  },
  chooseFileText: {
    fontSize: 16,
    color: "#6d6d6d",
    fontFamily: "Poppins-Regular",
    marginLeft: 10,
  },
});

export default Create;