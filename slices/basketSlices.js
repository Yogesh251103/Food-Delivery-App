import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect';

const initialState = {
  items:[],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state,action) => {
      state.items = [...state.items,action.payload]
    },
    removeFromBasket: (state,action) => {
      const index = state.items.findIndex((item)=>item.id===action.payload.id)
      let newBasket = [...state.items];
      if(index>=0){
        newBasket.splice(index,1);
      }
      state.items = newBasket;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsWithID = createSelector(
  [selectBasketItems, (state, id) => id], 
  (basketItems, id) => {
    return basketItems.filter(item => item.id === id);
  }
);


export const selectBasketTotal = (state) =>{
       return state.basket.items.reduce((total,item)=>total+item.price,0)
    }

export default basketSlice.reducer