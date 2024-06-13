import React, { Component, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { urlFor } from "../sanity";
import { Divider } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, { Circle, Path } from 'react-native-svg';
import {useDispatch, useSelector} from "react-redux"
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithID } from "../slices/basketSlices";

export default function Dishrow({ id, name, description, image, price }) {
    const [pressed,setPressed] = useState(false);
    const items = useSelector ((state)=>selectBasketItemsWithID(state,id))

    const dispatch = useDispatch();

    const addItemToBasket = () =>{
      dispatch(addToBasket({
        id,
        name,
        description,
        image,
        price,
      }))
    }

    console.log(image)

    const removeItemFromBasket = () =>{
      if (!items.length>0) return ;
      dispatch(removeFromBasket({id}));
    }
      console.log(items)
      
  return (
    <>
    <TouchableOpacity className="px-2.5 py-4 border-b-2 border-gray-200" onPress={()=>{
      setPressed(!pressed)
      }} >
      <View className="flex-row">
        <View className="flex justify-center w-4/5 pr-2">
          <Text className="text-lg font-semibold text-[#fcfcc4]"> {name} </Text>
          <Text className="text-xs ml-1 text-gray-300">
            {description}
          </Text>
          <Text className="text-xs ml-1 mt-1 font-semibold text-gray-100">Rs. {price}</Text>
          {/* <Text>{nonoe || "hello"}</Text> */}
          {pressed && (
        <View className="flex-row space-x-3 pt-2 items-center">
            <TouchableOpacity onPress={removeItemFromBasket} disabled={!items.length}>
            <Svg width={30} height={30} viewBox="0 0 24 24" fill="none">
        <Circle cx={12} cy={12} r={10} stroke="#fcfcdb" strokeWidth={1.5} />
        <Path d="M8 12h8" stroke="#fcfcdb" strokeWidth={1.5} />
      </Svg>
            </TouchableOpacity>
            <Text className="text-lg text-gray-100">{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
            <Svg width={30} height={30} viewBox="0 0 24 24" fill="none">
        <Circle cx={12} cy={12} r={10} stroke="#fcfcdb" strokeWidth={1.5} />
        <Path d="M8 12h8" stroke="#fcfcdb" strokeWidth={1.5} />
        <Path d="M12 8v8" stroke="#fcfcdb" strokeWidth={1.5} />
      </Svg>

            </TouchableOpacity>
        </View>
    )}
        </View>
        <View>
          <Image source={{ uri: urlFor(image).url()}} className="h-16 w-16 rounded-full"/>
        </View>
      </View>
    </TouchableOpacity>
    </>
  );
}
