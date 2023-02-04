import actions from './actionType';

const dummyMarkers = [
  {
    id: 1,
    name: 'Bakso Pak Budi',
    description:'vawbdk kjabwdjn kajwndlanwd',
    icon: '1F969',
    longitude: 106.7815256,
    latitude: -6.2610437,
    imageUrl:'https://i.pravatar.cc/300'
  },
  {
    id: 2,
    name: 'Pizza',
    description: 'aebnfkjnaek akjbdanjkdwaaaiodoaw  iwadoiaipjd',
    icon: '1F355',
    longitude: 106.7815256,
    latitude: -6.2603437,
    imageUrl:'https://i.pravatar.cc/300'
  }
]

export const openMarker = () => {
  return ( dispatch, getState ) => {
    dispatch({type:actions.openMarker})
  }
}

export const mapMarkers = (markers) => {
  return ( dispatch, getState ) => {
    dispatch({type:actions.mapMarkers, payload:markers?markers:dummyMarkers})
  }
}