import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect';

const initialState = {
  restaurant:{
    id:null,
      imgURL:null,
      title:null,
      rating:null,
      address:null,
      genre:null,
      short_description:null,
      dishes:null,
      lat:null,
      long:null,
  },
}

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurant:(state,actions)=>{
        state.restaurant = actions.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setRestaurant } = restaurantSlice.actions

export const selectRestaurant = (state) => state.restaurant.restaurant;

export default restaurantSlice.reducer