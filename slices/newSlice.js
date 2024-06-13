import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    newRes:{
        id:null,
        imgURL:null,
        title:null,
        rating:null,
        address:null,
        short_description:null,
        dishes:null,
        lat:null,
        long:null,
    },
  }

export const newResSlice = createSlice({
    name:"newRes",
    initialState,
    reducers:{
        setNew:(state,action)=> {
                state.newRes = action.payload;
            }
        }
    }
)

export const {setNew} = newResSlice.actions;

export const selectNewRes = (state) => state.newRes;

export default newResSlice.reducer;