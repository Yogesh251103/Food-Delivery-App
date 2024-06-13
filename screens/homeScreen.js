import {
  View,
  Text,
  Image,
  ViewBase,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import Categories from "../components/categories";
import client from "../sanity";
import FeaturedRowCard from "../components/featuredRowCard";
import Flatlist from "../components/flatlist";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [featuredCategories, setfeaturedCategories] = useState([]);
  const [showList,setShowList] = useState(false);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "featured"] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->
        }
      }
      
      `
      )
      .then((data) => {
        setfeaturedCategories(data);
      })
      .catch((err)=>console.log(err)) ;
  }, []);

  // console.log(featuredCategories);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
    <SafeAreaView className="bg-[#2E4053]" >
      <ScrollView showsVerticalScrollIndicator={false} className="bg-[#2E4053]">
      <StatusBar barStyle="dark-content" />
      <View className="flex-row mx-3 mt-2 py-2  space-x-3">
        <Image
          source={{
            uri: "https://imgs.search.brave.com/Dk54zxkt6rXbNZOd1FD3xabiKsIIp6Fibnwzjmj5si4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI4/NDI4NDIwMC9waG90/by9oZXMtb24tYS1t/aXNzaW9uLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1aczhl/MWFkTnQwMjVSY0JO/WjdwZzF2amRnTzRT/SGV0QndRSkNuSkRa/UjBVPQ",
          }}
          className="h-7 w-7 p-4 my-1 bg-gray-300 rounded-full"
        />

        <View className="flex-1 mb-0.125">
          <Text className="font-semibold text-[#dfdbdb] text-xs">
            Hello YM!
          </Text>
          <View className="flex-row items-center">
            <Text className="font-bold text-lg text-[#fdfda2]">Current Location </Text>
            <Icon
              name="chevron-down"
              size={24}
              color="#dfdbdb"
              style={{ marginTop: 4}}
            />
          </View>
        </View>
        <Icon
          name="user"
          size={24}
          color="#dfdbdb"
          style={{ marginTop: 14, marginRight: 7 }}
        />
      </View>
      <TouchableOpacity className=" flex-row items-center ml-5 mb-2 space-x-2 bg-gray-200 rounded w-4/5" onPress={()=>setShowList(!showList)}>
        <Icon name="search" size={20} style={{ marginLeft: 8 }} color="#5A355C"/>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="gray"
          className="p-1.5"
        ></TextInput>
      </TouchableOpacity>
      {showList && <Flatlist/>}
      <ScrollView className="bg-[#2E4053] pb-2 z-0">
        <Categories />
        {featuredCategories?.map((category) => (
          <FeaturedRowCard
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
      </ScrollView>
    </SafeAreaView>
    </>
  );
}
