import { AUTH, GOOGLE_AUTH, LOGOUT } from '../constants/actionTypes'

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      // const { name, picture, sub } = action?.data.token;
      console.log(action?.data)
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
      return { ...state, authData: action?.data.result }
    case GOOGLE_AUTH:
      console.log(action?.data)
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
      return { ...state, authData: action?.data.decodedToken }
    case LOGOUT:
      localStorage.clear()
      return { ...state, authData: null }
    default:
      return state
  }
}

export default authReducer