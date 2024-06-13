import React from 'react'
import {View,Text, TouchableOpacity,Image, Touchable} from 'react-native';
export default function CategoryCard({image,name}) {
  return (
    <TouchableOpacity className="relative">
      <Image source={{uri:image}} className="h-20 w-20 rounded mr-2"/>
      <Text className="absolute bottom-1 left-2 text-white font-bold" style={{fontSize:11}}>{name}</Text>
    </TouchableOpacity>
  )
}
