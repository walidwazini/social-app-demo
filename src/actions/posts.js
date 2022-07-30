import Axios from 'axios'
import * as api from '../api'
import {
  FETCH_ALL, START_LOADING, END_LOADING, CREATE, DELETE, UPDATE, FETCTH_BY_SEARCH
} from '../constants/actionTypes'

// Actions Creators
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    // const response = await api.fetchPosts()   
    const response = await Axios.get(`http://localhost:5000/posts?page=${page}`)
    const responseData = response.data

    console.log(responseData)
    dispatch({ type: FETCH_ALL, payload: responseData })
    dispatch({ type: END_LOADING })

  } catch (err) {
    console.log(err)
  }
}

export const getPostBySearch = searchQuery => async (dispatch) => {
  console.log(searchQuery)
  try {
    dispatch({ type: START_LOADING })
    const { data: { data } } = await api.fetchPostBySearch(searchQuery)
    dispatch({ type: FETCTH_BY_SEARCH, payload: data })
    dispatch({ type: END_LOADING })
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}

export const getPostByTitle = searchQ => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data: { data } } = await api.fetchPostByTitle(searchQ)
    dispatch({ type: FETCTH_BY_SEARCH, payload: data })
    console.log(data)
    dispatch({ type: END_LOADING })
  } catch (err) {
    console.log(err)
  }
}

export const createPost = post => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
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