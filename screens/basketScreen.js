import { View, Text, BackHandler, Image,Modal,ScrollView,TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { removeFromBasket, selectBasketItems } from "../slices/basketSlices";
import { selectRestaurant } from "../slices/restaurantSlice";
import { current } from "@reduxjs/toolkit";
import Icon from "react-native-vector-icons/FontAwesome";
import { urlFor } from "../sanity";

const BasketScreen = () => {
  const navigation = useNavigation();
  const items = useSelector(selectBasketItems);
  const restaurant = useSelector(selectRestaurant);
  const [modalVisible, setModalVisible] = useState(true);
  const [groupedBasket, setGroupedBasket] = useState([]);
  const [countt, setCount] = useState(0);
  const [retrievedData, setRetrievedData] = useState([]);

  const dispatch = useDispatch();
  

  useMemo(() => {
    const groupedItems = items.reduce((acc, current) => {
      (acc[current.id] = acc[current.id] || []).push(current);
      return acc;
    }, {});
    setGroupedBasket(groupedItems);
  }, [items]);

  console.log(groupedBasket);

  const totalPrice = Object.values(groupedBasket).reduce((acc, items) => {
    const itemTotalPrice = items.reduce((sum, item) => sum + item.price, 0);
    return acc + itemTotalPrice;
  }, 0);

  const deliveryFee = 47.25;
    
  return (
    <View className="flex-1">
      <Modal animationType="fade" transparent={false} visible={true}>
        <View className="flex-1 pt-3 bg-[#2E4053]">
          <View className="flex flex-row justify-center relative bg-[#2E4053] p-2">
            <View className="flex items-center ">
              <Text className="font-bold text-lg mr-2 text-[#fdfdbe]">Basket</Text>
              <Text className="text-gray-200">{restaurant.title}</Text>
            </View>
            <TouchableOpacity
              onPress={navigation.goBack}
              className="absolute left-80 top-5"
            >
              <Icon name="times" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-center space-x-3 bg-[#2E4053] justify-around mt-5 pb-6 pt-3">
            <>
            <Image source={require("../assets/shuttle.png")} className="w-7 h-7 rounded-full  bg-gray-900"/>
            <Text className="text-gray-100">Delivery in 40-50 minutes</Text>
            </>
            <Text className="flex font-semibold ml-auto text-gray-300">Change</Text>
          </View>
          <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedBasket).map(([id,items])=>(
                <View key={id} className="w-full bg-[#2E4053] flex-row items-center p-2 space-x-3 ">
                  <Text className="text-gray-500">{items.length} x</Text>
                <Image source={{uri: urlFor(items[0]?.image).url()}} className="w-10 h-10 rounded-full bg-slate-700 "/>
                <Text className="font-semibold text-[14.25px] text-gray-200">{items[0]?.name}</Text>
                <View className="flex-row items-center space-x-2" style={{position:"absolute",right:10}}>
                <Text className="text-[13.25px] text-[#fdfdbe]">Rs. {items[0]?.price*items.length}</Text>
                <TouchableOpacity onPress={()=>dispatch(removeFromBasket({id:id}))}>
                  <Text className="font-semibold text-gray-300 text-xs">
                    Remove
                  </Text>
                </TouchableOpacity>
                </View>
              </View>
          ))}
          </ScrollView>
        </View>
        <View className="bg-gray-50 p-3 space-y-4">
          <View className="flex-row w-full justify-between">
          <Text className="text-gray-600">Subtotal</Text>
          <Text className="text-gray-600">Rs. {totalPrice}</Text>
          </View>
          <View className="flex-row w-full justify-between">
          <Text className="text-gray-600">Delivery Charge </Text>
          <Text className="text-gray-600">Rs. {deliveryFee} </Text>
          </View>
          <View className="flex-row w-full justify-between">
          <Text className="font-extrabold">Total Payable</Text>
          <Text className="font-extrabold">Rs.{deliveryFee + totalPrice}</Text>
          </View>         
          <TouchableOpacity className="w-full items-center bg-yellow-500 rounded-lg p-4" onPress={()=>navigation.navigate('Orderload')}>
            <Text className="font-semibold" style={{fontSize:16}}>Order Now</Text>
          </TouchableOpacity>

        </View>
      </Modal>
      </View>
  );
};

export default BasketScreen;
