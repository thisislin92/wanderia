const initialState = {
    markerState: false,
    markers:[], // {id, name, description, lat, lng, categories, events}
    bussinessInfo:{
      bussinessId:'',
      name:'',
      description:'',
      events:[],
      categories:'',
    }
};

const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'openMarker':
      return {
        ...state,
        markerState:!state.markerState,
      }
    case 'mapMarkers':
      return {
        ...state,
        markers:action.payload
      }
    default:
      return state
  }
}

export default foodReducer