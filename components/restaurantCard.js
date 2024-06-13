import React from 'react'
import { TouchableOpacity,Image,View,Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { urlFor } from '../sanity';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setNew } from '../slices/newSlice';

export default function RestaurantCard({
  id,
  imgURL,
  title,
  rating,
  address,
  genre,
  short_description,
  dishes,
  long,
  lat,
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  // console.log(imgURL)
  return (
    <View>
      <TouchableOpacity className="justify-center bg-[#dfdbdb] mr-2" onPress={()=>{
        navigation.navigate("Restaurant",{id,
  imgURL,
  title,
  rating,
  address,
  genre,
  short_description,
  dishes,
  long,
  lat})
  }}>

          <Image source={{uri:urlFor(imgURL).url(),}} className="h-36 w-64 rounded-sm "/>
          <View className="ml-1 space-y-1 px-2 py-2 ">
            <Text className="font-bold text-lg">
              {title}
            </Text>
            <View className="flex-row items-center">
            <Icon name="star" size={18} color="#00B1CB"/>
            <Text className="text-gray-500 text-xs">
            {'   '}{rating}{'   '}{genre}  
            </Text>
            </View>
            <View className="flex-row items-center  ml-0.5 w-56"><Icon name="map-marker" size={18} />
            <Text>{'   '}</Text>
            <Text className="text-gray-500 text-xs">
              {address}
            </Text>
            </View>
          </View>
      </TouchableOpacity>
    </View>
  )
}