import { configureStore } from '@reduxjs/toolkit'
import { pizzaApi } from './pizzaApi'
import pizzaReducer from './pizzaSlice'

// const exampleReducer = (state = { count: 0 }) => {
//   return state
// }

export const resetStore = () => configureStore({
  reducer: {
    pizzaState: pizzaReducer,
    // add your reducer(s) here
    [pizzaApi.reducerPath] : pizzaApi.reducer,
  },
  middleware: getDefault => getDefault().concat(
    pizzaApi.middleware,
  ),
})

export const store = resetStore()
