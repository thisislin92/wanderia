import { createSlice } from "@reduxjs/toolkit";

const dummyWaypoints = [
  {
    "id": "2521bf27-8b2e-4a51-ac5e-f2464058050b", 
    "name": "Kopi Poci Rajawali", 
    "address": "Jl. Rajawali Selatan Jl. Gn. Sahari 11 Dalam No.1B, RT.13/RW.2", 
    "rating": "4.8", 
    "price": "$", 
    "longitude": "106.839994", 
    "latitude": "-6.143049", 
    "icon": "2615", 
    "category": "Kedai Kopi", 
    "imageUrl": "https://lh5.googleusercontent.com/p/AF1QipMgRi3MQEnn46AudVTSZWm7CJgR5uMM4ljpNYWi=w122-h92-k-no"
  }, {
    "id": "2b5e40a1-d1aa-40ca-8403-87f9cb6c7b76", 
    "name": "Kopi Kalong", 
    "address": "Komplek Ruko Gading Bukit Indah, Jl. Raya Gading Kirana, RT.18/RW.8", 
    "rating": "4.9", 
    "price": null, 
    "longitude": "106.8984084", 
    "latitude": "-6.1497354", 
    "icon": "2615", 
    "category": "Kedai Kopi", 
    "imageUrl": "https://lh5.googleusercontent.com/p/AF1QipONiyZfGF1A7BZz7-X6aY9qOgErGQ9WgeTyfuj9=w80-h106-k-no"
  }, {
    "id": "9bf1ce70-81b5-47a0-828d-17daf33b1b93", 
    "name": "KOPI KREN #kren001", 
    "address": "Jl. Pos No.2", 
    "rating": "4.9", 
    "price": "$$", 
    "longitude": "106.8336437", 
    "latitude": "-6.166876", 
    "icon": "2615", 
    "category": "Kedai Kopi", 
    "imageUrl": "https://lh5.googleusercontent.com/p/AF1QipNzP5qPdxs-GPeYwnDBH0lzk0pzxyC09vBxThmM=w127-h92-k-no"
  }
]

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
  waypoints: dummyWaypoints,
  locationPermission: false,
  startNavigation: false,
  selectedRide: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, actions) => {
      state.origin = actions.payload;
    },
    setDestination: (state, actions) => {
      state.destination = actions.payload;
    },
    setTravelTimeInformation: (state, actions) => {
      state.travelTimeInformation = actions.payload;
    },
    setWaypoints: (state, actions) => {
      state.waypoints = actions.payload?.length?action.payload:dummyWaypoints;
    },
    setLocationPermission: (state, actions) => {
      state.locationPermission = actions.payload;
    },
    setStartNavigation: (state, actions) => {
      state.startNavigation = actions.payload;
    },
    setSelectedRide: (state, actions) => {
      state.selectedRide = actions.payload;
    },
  },
});

export const {
  setOrigin,
  setDestination,
  setTravelTimeInformation,
  setWaypoints,
  setLocationPermission,
  setStartNavigation,
  setSelectedRide,
} = navSlice.actions;

// Selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;
export const selectWaypoints = (state) => state.nav.waypoints;
export const selectLocationPermission = (state) => state.nav.locationPermission;
export const selectStartNavigation = (state) => state.nav.startNavigation;
export const selectSelectedRide = (state) => state.nav.selectedRide;

export default navSlice.reducer;
