import { FETCH_ALL, CREATE, DELETE, UPDATE } from '../constants/actionTypes'

export default (posts = [], action) => {
  switch (action.type) {
    case DELETE:
      return posts.filter(post => post._id !== action.payload)
    case FETCH_ALL:
      console.log(action)
      return action.payload
    case CREATE:
      return [...posts, action.payload]
    case UPDATE:
      // case LIKE:
      return posts.map(post => {
        return post._id === action.payload._id
          ? action.payload
          : post
      })
    default:
      return posts
  }
}