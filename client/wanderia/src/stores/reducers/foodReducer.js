const initialState = {
  food: [],
  foodById: {},
  isLoading: true,
}

const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'food/getFood':
      return {
        ...state,
        food: action.payload,
        isLoading: false,
      }
    case 'food/getFoodById':
      return {
        ...state,
        foodById: action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}

export default foodReducer