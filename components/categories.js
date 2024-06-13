import React, { useEffect, useState } from 'react'
import { ScrollView, Text } from "react-native"; 
import CategoryCard from './categoryCard';
import client, { urlFor } from '../sanity';
export default function Categories() {
  const [categories,setCategories] = useState([]);

  useEffect(()=>{
    client.fetch(
      `*[_type == "category"]`
    ).then((data)=>setCategories(data))
  },[])

  return (
      <ScrollView horizontal contentContainerStyle={{paddingHorizontal:15,paddingTop:10}}>
          {categories?.map((data
          )=>
            <CategoryCard
            key={data._id} image={urlFor(data.image).url()} name={data.name}/>
          )}
      </ScrollView>
  )
}
