import { View, Text,Image,TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import client, { urlFor } from '../sanity'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectNewRes, setNew } from '../slices/newSlice'
import { select } from '@react-native-material/core'

export default function Flatlist() {
    const [data,setData] = useState([]);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const selector = useSelector(selectNewRes)

    useEffect(()=>{
        client.fetch(
            `*[_type == "restaurant"] {
                ...,
              }
              `
        )
        .then(data=>setData(data))
        .catch(err=>console.error(err))
    },[])

    // const pressHandler = (item) =>{
    //   dispatch(setNew({id:item._id,
    //     imgURL:urlFor(item.image).url(),
    //     title:item.name,
    //     rating:item.rating,
    //     address:item.address,
    //     short_description:item.shirt_description,
    //     dishes:item.dishes,
    //     long:item.long,
    //     lat:item.lat}))
    //   console.log(urlFor(item.image).url())
    //   console.log(item)
    //     navigation.navigate("Restaurant",{id:selector.newRes._id,
    //       title:selector.newRes.name,
    //       rating:selector.newRes.rating,
    //       address:selector.newRes.address,
    //       short_description:selector.newRes.short_description,
    //       dishes:selector.newRes.dishes,
    //       long:selector.newRes.long,
    //       lat:selector.newRes.lat})
    // }

  return (
    <View className="w-4/5 h-auto bg-white self-center z-50 -mb-20 mr-7 rounded-sm">
     {data?.map((item)=>(
        <TouchableOpacity className="flex-row space-x-2 p-3 items-center" >
            <Image source={{uri:urlFor(item.image.asset._ref).url()}} className="w-8 h-8 rounded-full" alt="pic"/>
            <Text>{item.name}</Text>
        </TouchableOpacity>
     ))}
    </View>
  )
}