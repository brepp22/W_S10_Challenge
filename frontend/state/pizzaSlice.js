import { createSlice } from '@reduxjs/toolkit'


const initialState =  { 
    fullName: '',
    size: 'All',
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
  }

  export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState, 
    reducers: {
        toggleSize( state , action ) {
            const { size } = action.payload
            state.size = state.size === size ? 'All' : size
        },
    }
  })

  export const { toggleSize , } = pizzaSlice.actions

  export default pizzaSlice.reducer 