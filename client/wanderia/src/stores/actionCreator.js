import listActions from '../stores/actionType';
// const baseUrl = 'http://localhost:3000'
const baseUrl = 'https://h8-kfc-canteen.foxhub.space'


// User
export const postLogin = ({ email, password }) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch( `${baseUrl}/users/login`, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })
      const responsJSON = await response.json()
      if (!response.ok){
        throw responsJSON
      } else {
        return {data: responsJSON, error:null}
      }
    } catch (response) {
      return {data: null, error:response}
    }
  }
}

export const postRegister = (data) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch( `${baseUrl}/users/register`, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const responsJSON = await response.json()
      if (!response.ok){
        throw responsJSON
      } else {
        return {data: responsJSON, error:null}
      }
    } catch (response) {
      return {data: null, error:response}
    }
  }
}

// Food
export const getFood = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch( `${baseUrl}/food`,{
        method:'GET',
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })
      const responsJSON = await response.json()

      dispatch({type:listActions.getFood, payload: responsJSON.data})
    } catch (error) {
      console.log(error)
    }
  }
}

export const postFood = (data) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch( `${baseUrl}/food`, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          'access_token': localStorage.getItem('access_token')
        },
        body: JSON.stringify(data)
      })
      const responsJSON = await response.json()
      console.log(responsJSON)
      if (!response.ok){
        throw responsJSON
      } else {
        return {data: responsJSON, error:null}
      }
    } catch (response) {
      return {data: null, error:response}
    }
  }
}

export const deleteFoodById = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch( `${baseUrl}/food/`+id, {
        method:'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'access_token': localStorage.getItem('access_token')
        }
      })
      const responsJSON = await response.json()
      if (!response.ok){
        throw responsJSON
      } else {
        return {data: responsJSON, error:null}
      }
    } catch (response) {
      return {data: null, error:response}
    }
  }
}

export const getFoodById = (FoodId) => {
  return async (dispatch, getState) => {
    if (!FoodId) return ({data: null, error:null})
    try {
      const response = await fetch( `${baseUrl}/food/`+FoodId, {
        method:'GET',
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })
      const responsJSON = await response.json()
      console.log({data: responsJSON.data, error:null}, 'diaction hasil fetch')
      if (!response.ok){
        throw responsJSON
      } else {
        // return {data: responsJSON.data, error:null}
        dispatch({type:listActions.getFoodById, payload: responsJSON.data})
      }
    } catch (response) {
      return {data: null, error:response}
    }
  }
}

export const putEdit = (data, id) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch( `${baseUrl}/food/`+id, {
        method:'PUT',
        headers: {
          'Content-Type': 'application/json',
          'access_token': localStorage.getItem('access_token')
        },
        body: JSON.stringify(data)
      })
      const responsJSON = await response.json()
      if (!response.ok){
        throw responsJSON
      } else {
        return {data: responsJSON, error:null}
      }
    } catch (response) {
      return {data: null, error:response}
    }
  }
}

// Category
export const getCategories = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch( `${baseUrl}/categories`,{
        method:'GET',
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })
      
      const responsJSON = await response.json()
      const { food } = await getState().foodReducer;

      const countCategory = food.reduce((acc, cur) => Object.assign(acc, {
        [cur.categoryId]:  (acc[cur.categoryId] || 0) + 1, 
      }), {})

      const newCategoryState = responsJSON.data.map(el => {
        el.countCategory = countCategory[el.id]
        return el
      })

      dispatch({type:listActions.getCategories, payload: newCategoryState})
    } catch (error) {
      console.log(error)
    }
  }
}

export const postCategory = (data) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch( `${baseUrl}/categories`, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          'access_token': localStorage.getItem('access_token')
        },
        body: JSON.stringify({name:data})
      })
      const responsJSON = await response.json()
      if (!response.ok){
        throw responsJSON
      } else {
        return {data: responsJSON, error:null}
      }
    } catch (response) {
      return {data: null, error:response}
    }
  }
}

export const deleteCategoryById = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch( `${baseUrl}/categories/`+id, {
        method:'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'access_token': localStorage.getItem('access_token')
        }
      })
      const responsJSON = await response.json()
      if (!response.ok){
        throw responsJSON
      } else {
        return {data: responsJSON, error:null}
      }
    } catch (response) {
      return {data: null, error:response}
    }
  }
}

// Category
export const getLogs = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch( `${baseUrl}/logs`,{
        method:'GET',
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })
      
      const responsJSON = await response.json()

      dispatch({type:listActions.getLogs, payload: responsJSON.data})
    } catch (error) {
      console.log(error)
    }
  }
}