export default (posts = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL':
      console.log(action)
      return action.payload
    case 'CREATE':
      return posts
    case 'EDIT':
      return posts

    default:
      return posts
  }
}