const initialState = {
    markerState: true,
    markers: [], // {id, name, address, latitude, longitude, category, icon, rating, price, events}
    bussinessInfo: {},
};

const foodReducer = (state = initialState, action) => {
    switch (action.type) {
        case "openMarker":
            return {
                ...state,
                markerState: true,
                bussinessInfo: action.payload[0],
            };
        case "closeMarker":
            return {
                ...state,
                markerState: false,
                bussinessInfo: {},
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

export default foodReducer;
