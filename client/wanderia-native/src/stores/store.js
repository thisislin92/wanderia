import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice";
import uxSlice from "./slices/uxSlice";

export default configureStore({
  reducer: {
    nav : navReducer,
    ux : uxSlice
  }
})

function getCorners(coord1, coord2) {
  const left = Math.min(coord1[1], coord2[1]);
  const right = Math.max(coord1[1], coord2[1]);
  const bottom = Math.min(coord1[0], coord2[0]);
  const top = Math.max(coord1[0], coord2[0]);
  
  return { left, right, bottom, top };
}