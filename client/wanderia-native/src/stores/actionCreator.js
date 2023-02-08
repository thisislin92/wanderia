import actions from './actionType';
import { dummyMarkers } from './markers.json'
import { gql, useQuery } from '@apollo/client';

export const openMarker = (data) => {
    return (dispatch, getState) => {
      console.log(data, "diaction <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");

      const dataMarker = {
            id: data.id,
            name: data.name,
            address: data.address,
            price: data.price,
            rating: data.rating,
            latitude: data.latitude,
            longitude: data.longitude,
            posts: data.posts,
            // category: data.category,
            imageUrl: data.imageUrl
          }
        console.log(dataMarker, "diaction <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");

        dispatch({ type: actions.openMarker, payload: dataMarker });
    };
};

export const closeMarker = () => {
    return (dispatch, getState) => {
        dispatch({ type: actions.closeMarker });
    };
};

export const mapMarkers = (markers) => {
  return async( dispatch, getState ) => {
    // console.log(markers, 'diactions<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,,')
    dispatch({ type: actions.mapMarkers, payload: markers })
  }
}
