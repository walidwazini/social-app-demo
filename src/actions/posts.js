import * as api from '../api'
import { FETCH_ALL, CREATE, DELETE, UPDATE } from '../constants/actionTypes'

// Actions Creators
export const getPosts = () => async (dispatch) => {
  try {
    const response = await api.fetchPosts()
    const responseData = response.data
    dispatch({ type: FETCH_ALL, payload: responseData })

  } catch (err) {
    console.log(err)
  }
}

export const getPostBySearch = searchQuery => async (dispatch) => {
  try {
    const { data } = await api.fetchPostBySearch(searchQuery)
    console.log(data)
  } catch (err) {
    console.log(err)

  }
}

export const createPost = post => async (dispatch) => {
  try {
    const response = await api.createPost(post)
    const responseData = response.data

    dispatch({ type: CREATE, payload: responseData })
  } catch (err) {
    console.log(err.message)
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post)
    // console.log(post)
    dispatch({ type: UPDATE, payload: data })
  } catch (err) {
    console.log(err)
  }
}

export const removePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id)
    dispatch({ type: DELETE, payload: id })
  } catch (err) {
    console.log(err)
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id)
    dispatch({ type: UPDATE, payload: data })
  } catch (err) {
    console.log(err)
  }
}