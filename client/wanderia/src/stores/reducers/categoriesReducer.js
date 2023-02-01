const initialState = {
  categories: [],
  isLoading: true,
}

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'categories/getCategories':
      return {
        ...state,
        categories: action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}

export default categoriesReducer