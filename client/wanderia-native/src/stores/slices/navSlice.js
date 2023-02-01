import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
}

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers:{
    serOrigin: (state, actions) =>{
      state.origin = actions.payload
    },
    serDestination: (state, actions) =>{
      state.destination = actions.payload
    },
    serTravelTimeInformation: (state, actions) =>{
      state.travelTimeInformation = actions.payload
    }
    
  }
})

export const { serOrigin, serDestination, serTravelTimeInformation } = navSlice.actions

// Selectors
export const selectOrigin = (state) => state.nav.origin
export const selectDestination = (state) => state.nav.destination
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation

export default navSlice.reducer