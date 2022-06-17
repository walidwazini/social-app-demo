import * as api from '../api'

// Actions Creators
export const getPosts = () => async (dispatch) => {
  try {
    const response = await api.fetchPosts()
    const responseData = response.data

    console.log(response)

    dispatch({ type: 'FETCH_ALL', payload: responseData })

  } catch (err) {
    console.log(err.message)
  }
}
