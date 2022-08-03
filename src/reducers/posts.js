import {
  FETCH_ALL, CREATE, DELETE, UPDATE, FETCTH_BY_SEARCH,
  START_LOADING, END_LOADING, FETCH_POST
} from '../constants/actionTypes'

export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      // console.log(state)
      return { ...state, isLoading: true }
    case END_LOADING:
      // console.log(state)
      return { ...state, isLoading: false }
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numOfPages: action.payload.numOfPages
      }
    case FETCTH_BY_SEARCH:
      return { ...state, posts: action.payload.data }
    case FETCH_POST:
      return { ...state, post: action.payload.post }
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] }
    case UPDATE:
      // case LIKE:
      return {
        ...state,
        posts: state.posts.map(post => {
          return post._id === action.payload._id
            ? action.payload
            : post
        })
      }
    case DELETE:
      return { ...state, posts: state.posts.filter(post => post._id !== action.payload) }
    default:
      return state
  }
}