import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './slices/basketSlices'
import restaurantReducer from  './slices/restaurantSlice'
import newSliceReducer from './slices/newSlice'

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restaurant:restaurantReducer,
    newRes:newSliceReducer,
  },
}) 