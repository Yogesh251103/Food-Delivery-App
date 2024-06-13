import React from 'react'
import {View,Text, TouchableOpacity} from 'react-native'
import { selectBasketItems, selectBasketTotal } from '../slices/basketSlices'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

export default function BasketIcon() {
    const items = useSelector(selectBasketItems);
    const navigation = useNavigation();
    const basketTotal = useSelector(selectBasketTotal);
  return (
    <View className="absolute bottom-7 mx-5 w-[90%] z-50">
        <TouchableOpacity className="flex-row space-x-2 items-center justify-between bg-[#EAC866] px-4 rounded-lg h-12" onPress={()=>navigation.navigate('Basket')}>
        <Text className="text-white font-extrabold px-1" >{items.length}</Text>
        <Text className="text-white font-extrabold text-[15px]">View Basket</Text>
        <Text className="text-white font-extrabold" >Rs.{basketTotal}</Text>
      </TouchableOpacity>
    </View>
  )
}
