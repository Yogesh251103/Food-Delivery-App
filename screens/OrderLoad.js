import { View, Text,Modal, SafeAreaView,Image } from 'react-native'
import React from 'react'
import * as Animatable from "react-native-animatable"
import { useRef } from 'react'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const OrderLoad = () => {
  const navigation = useNavigation();

  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate('Success')
    },4000);
  },[]);
  return (
    <View className="flex-1 bg-white">
    <Modal animationType='slide' visible={true} transparent={false} className="">
    <SafeAreaView className=" flex-1 justify-center items-center bg-white">
    <Animatable.Image source={require("../assets/1da4c013-0a9e-43a3-a2d3-6cdd7c123033.gif")} animation="slideInRight" iterationCount={1}/>
    <Animatable.View animation="slideInLeft" iterationCount={1} className="flex-row w-full items-center justify-center">

    <Animatable.Text className="font-semibold">
      Waiting for restaurant to accept your order
    </Animatable.Text>
    <Image source={require("../assets/animation_lmxck8yq_small.gif")} className="w-10 h-10 mt-1"/>
    </Animatable.View>
    </SafeAreaView>
    </Modal> 
    </View>
  )
}

export default OrderLoad