import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../slices/restaurantSlice";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

const Success = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  console.log(restaurant);
  return (
    <View className="flex-1 pt-12 bg-[#2E4053]">
      <View className="flex-row w-full justify-between items-center px-4">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="times" size={18} color="#F5F5F5" />
        </TouchableOpacity>
        <Text className="text-gray-300">Help?</Text>
      </View>
      <View className="mx-3 mt-6 bg-white py-4 px-4 rounded-sm shadow-lg z-50">
        <Text className="text-gray-500">Estimated Time</Text>
        <Text className="text-2xl font-extrabold ">40-50 Minutes Only!</Text>
        <Image
          source={require("../assets/animation_lmxeabzu_small.gif")}
          className="absolute w-16 h-16 top-1 right-4"
        />
        <Progress.Bar
          width={80}
          height={6}
          className="mt-2"
          color="#77b9ff"
          indeterminate={true}
        />
        <Text className="text-gray-500 text-xs mt-2">
          {restaurant.title} is preparing your delicious order!
        </Text>
      </View>
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        className="flex-1 -mt-10 z-0 -mb-96"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{ latitude: restaurant.lat, longitude: restaurant.long }}
        >
          <Image
            source={require("../assets/address.png")}
            className="w-10 h-10"
          />
        </Marker>
      </MapView>
      <View className="w-[90%] h-auto z-50 -mt-5 mb-3 bg-white self-center p-3">
        <Text className="font-semibold text-[16px]">Your Delivery Partner</Text>
        <View className="flex-row pt-2">
          <View>
          <Image
            source={{
              uri: "https://imgs.search.brave.com/Dk54zxkt6rXbNZOd1FD3xabiKsIIp6Fibnwzjmj5si4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI4/NDI4NDIwMC9waG90/by9oZXMtb24tYS1t/aXNzaW9uLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1aczhl/MWFkTnQwMjVSY0JO/WjdwZzF2amRnTzRT/SGV0QndRSkNuSkRa/UjBVPQ",
            }}
            className="w-10 h-10 rounded-full"
          />
          <View className="flex-row pt-1">
          <Image source={require("../assets/star.png")} className="w-3 h-3" />
          <Image source={require("../assets/star.png")} className="w-3 h-3" />
          <Image source={require("../assets/star.png")} className="w-3 h-3" />
          <Image source={require("../assets/star.png")} className="w-3 h-3" />
        </View>
          </View>
          <View className="pl-3">
            <Text className="font-semibold">YOGESH M </Text>
            <Text className="w-44 text-xs text-gray-700 mt-1">
            "I'm a dedicated food delivery professional, do not worry about any damage."
              </Text>
          </View>
          <TouchableOpacity className=" ml-auto mr-2">

          <Image source={require("../assets/phone-call.png")} className="h-8 w-8"/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Success;
