import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import theme from '../style'
import CustomButton from './CustomButton'
import {router} from 'expo-router'

const EmptyState = ({title, subtitle}) => {
  return (
    <View style={{justifyContent:'center', alignItems:'center', paddingHorizontal:8}}>
      <Image source={images.empty}
      style = {{resizeMode:'contain', width:270, height:215}}/>
        <Text style={{fontFamily:'Poppins-SemiBold', color:theme.colors.white.DEFAULT, fontSize:24}}>
            {title}
        </Text>
        <Text style={{fontFamily:'Poppins-Medium', color:theme.colors.gray[100], fontSize:14}}>
            {subtitle}
        </Text>

        <CustomButton
            title={"Create video"}
            handlePress={() => router.push('/create')}
            containerStyles={{width: '90%', marginVertical:24}}
        />
    </View>
  )
}

export default EmptyState