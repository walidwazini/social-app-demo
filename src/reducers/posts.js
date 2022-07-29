import { FETCH_ALL, CREATE, DELETE, UPDATE, FETCTH_BY_SEARCH } from '../constants/actionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case DELETE:
      return state.filter(post => post._id !== action.payload)
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numOfPages: action.payload.numOfPages
      }
    case FETCTH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload,
      }
    case CREATE:
      return [...state, action.payload]
    case UPDATE:
      // case LIKE:
      return state.map(post => {
        return post._id === action.payload._id
          ? action.payload
          : post
      })
    default:
      return state
  }
}