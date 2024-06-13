import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { urlFor } from "../sanity";
import { MaterialIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { Divider } from "@react-native-material/core";
import Dishrow from "../components/dishrow";
import BasketIcon from "../components/basketIcon";
import { useDispatch, useSelector } from "react-redux";
import { selectBasketItems } from "../slices/basketSlices";
import { setRestaurant } from "../slices/restaurantSlice";
import { selectNewRes } from "../slices/newSlice";

export default function RestaurantScreen() {
  const {
      id,
      imgURL,
      title,
      rating,
      address,
      genre,
      short_description,
      dishes,
      long,
      lat
  } = useRoute().params;

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setRestaurant({
      id,
      imgURL,
      title,
      rating,
      address,
      genre,
      short_description,
      dishes,
      lat,
      long
    }))
  },[])
  
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const len = useSelector(selectBasketItems).length;

  return (
    <>
    <ScrollView showsVerticalScrollIndicator={false} className="bg-[#2E4053]">
      <View className="relative">
        <Image source={{ uri: urlFor(imgURL).url() }} className="w-full h-52" />
        <TouchableOpacity
          className="absolute top-14 left-4 border-solid "
          onPress={navigation.goBack}
        >
          <View className="border rounded-full h-7 w-7 border-white justify-center items-center">
            <MaterialIcons name="arrow-back" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
      <View className="h-30 bg-[#2E4053] w-full p-3">
        <Text className="font-extrabold text-xl text-[#fdfda2] tracking-widest">{title}</Text>
        <View className="flex-row space-x-2 mt-2 ">
          <View className="flex-row space-x-2 mr-2">
            <Icon name="star" size={18} color="yellow" />
            <Text className="font-semibold text-gray-200">{rating}</Text>
          </View>
          <View className="flex-row space-x-2 justify-center items-center">
            <Icon name="map-marker" size={18} style={{ color: "orange" }} />
            <Text className="text-s font-semibold text-gray-100">{address}</Text>
          </View>
        </View>
      <Text className="text-s font-semibold my-2.5 text-gray-300">{short_description}</Text>
      <Divider color="#F5F5F5" style={{ marginVertical: 3}}/>
        <TouchableOpacity className="">
        <View className="flex-row w-full mt-2">
          <Image source={require('../assets/question.png')} className="w-5 h-5" />
          <Text className="ml-4 font-semibold text-gray-100" >Learn more </Text>
      <Icon
        name="chevron-right"
        size={16}
        color="#F5F5F5"
        style={{  marginLeft:"auto",marginTop: 2.5 }}
      />
    </View>
        </TouchableOpacity>
      </View>
      <Text className="text-lg font-semibold p-2 pl-3.5 text-gray-50">Menu</Text>
      <View className="w-full bg-[#2E4053] h-auto pb-32">
      {dishes?.map((dish)=>(              <Dishrow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description = {dish.shirt_description}
              price = {dish.price}
              image = {dish.image}
              />
        )
            
        )}
      </View>
    </ScrollView>
    {len>0 && (<BasketIcon/>)}
      
    </>
  );
}
