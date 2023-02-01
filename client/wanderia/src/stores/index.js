import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import foodReducer from './reducer/foodReducer'
// import categoriesReducer from './reducer/categoriesReducer'
// import logsReducer from './reducer/logsReducer'

// const allReducers = combineReducers({
//   foodReducer,
//   categoriesReducer,
//   logsReducer
// })

// const store = createStore(allReducers, applyMiddleware(thunk))
const store = {}

export default store