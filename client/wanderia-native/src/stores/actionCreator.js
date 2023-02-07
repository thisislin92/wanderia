import actions from './actionType';
import { dummyMarkers } from './markers.json'
import { gql, useQuery } from '@apollo/client';

export const openMarker = ( id ) => {
  return ( dispatch, getState ) => {
    console.log('diaction <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
    const data = getState().ux.markers.filter((marker) => marker.id === id)
    dispatch({type:actions.openMarker, payload:data})
  }
}

export const closeMarker = ( ) => {
  return ( dispatch, getState ) => {
    dispatch({type:actions.closeMarker})
  }
}

export const mapMarkers = () => {
  return async( dispatch, getState ) => {
    const REQ_MARKER = gql`
      query AllBusiness($input: GetBusiness) {
        allBusiness(input: $input) {
          id
          name
          address
          latitude
          longitude
        }
      }
    `
    let { loading, data } = await useQuery(REQ_MARKER);


    dispatch({type:actions.mapMarkers, payload:markers?markers:dummyMarkers})
  }
}