import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Image, Text, ScrollView } from "react-native";
import RestaurantCard from "./restaurantCard";
import client from "../sanity";
export default function FeaturedRowCard({ id, title, description }) {

  const [restaurants,setRestaurants] = useState([]);

  useEffect (()=>{
    client.fetch(
      `
      *[_type == "featured" && _id==$id] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->,
          type->{
            name
          }
        }
      }[0]
      `,{id}
    ).then(data=>setRestaurants(data.restaurants))
  },[id]);
  // console.log(restaurants[0].image)

  const rightArrowSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2">
    <path d="M10 17l5-5-5-5"/>
  </svg>
`;
  return (
    <>
      <View className="p-2 ml-2 justify-center mb-1 h-[70]">
        <View className="flex-row flex-1 justify-between items-center">
          <Text className="font-bold text-lg text-[#fdfda2]">{title}</Text>
        </View>
        <Text className="text-xs text-white">{description}</Text>
      </View>
      <ScrollView horizontal contentContainerStyle={{paddingHorizontal:15,}} className="pt-1 ">
        {restaurants?.map((restaurant) =>(
          
          <RestaurantCard 
          key={restaurant._id}
          id={restaurant._id}
          imgURL={restaurant.image} rating={restaurant.rating}
           genre={restaurant.genre} title={restaurant.name} 
           dishes={restaurant.dishes}
           short_description={restaurant.shirt_description}
           address={restaurant.address}
           lat={restaurant.lat}
           long={restaurant.long}/>
        ))}
      </ScrollView>
    </> 
  );
}
