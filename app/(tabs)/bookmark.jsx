import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import theme from '../../style'
import EmptyState from '../../components/EmptyState'

const Bookmark = () => {
  return (
    <SafeAreaView style={{height:"100%", backgroundColor:theme.colors.primary, alignContent:'center', justifyContent:'center'}}>
      <View style={{justifyContent:'center', alignItems:'center', paddingHorizontal:8}}>
          <Text style={{fontFamily:'Poppins-SemiBold', color:theme.colors.white.DEFAULT, fontSize:24}}>
              Cooming Soon
          </Text>
          <Text style={{fontFamily:'Poppins-Medium', color:theme.colors.gray[100], fontSize:14}}>
              On Progress...
          </Text>

      </View>
    </SafeAreaView>
  )
}

export default Bookmark