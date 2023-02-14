const initialState = {
    markerState: false,
    markers: [], // {id, name, address, latitude, longitude, category, icon, rating, price, events}
    bussinessInfo: {},
};

const markerReducer = (state = initialState, action) => {
    switch (action.type) {
        case "openMarker":
            console.log(action.payload, 'di global state <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
            return {
                ...state,
                markerState: true,
                bussinessInfo: action.payload,
            };
        case "closeMarker":
            return {
                ...state,
                markerState: false
            };
        case "mapMarkers":
            return {
                ...state,
                markers: action.payload,
            };
        default:
            return state;
    }
};

export default markerReducer;
