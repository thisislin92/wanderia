const initialState = {
  logs: [],
  isLoading: true,
}

const LogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'logs/getLogs':
      return {
        ...state,
        logs: action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}

export default LogsReducer