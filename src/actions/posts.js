import Axios from 'axios'

import * as api from '../api'
import {
  FETCH_ALL, START_LOADING, END_LOADING, CREATE, DELETE, UPDATE, FETCTH_BY_SEARCH, FETCH_POST
} from '../constants/actionTypes'


// Actions Creators
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    // const response = await api.fetchPosts()   
    const response = await Axios.get(`http://localhost:5000/posts?page=${page}`)
    const responseData = response.data
    const { data, currentPage, numOfPages } = responseData
    // console.log(responseData)

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numOfPages } })
    dispatch({ type: END_LOADING })

  } catch (err) {
    console.log(err)
  }
}

export const getSinglePost = postId => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await Axios.get(`http://localhost:5000/posts/${postId}`)
    console.log(data)

    dispatch({ type: FETCH_POST, payload: { post: data } })
    dispatch({ type: END_LOADING })

  } catch (err) {
    console.log(err)
  }
}

export const getPostBySearch = searchQuery => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    console.log(searchQuery)
    const { data } = await api.fetchPostBySearch(searchQuery)
    const { searchResult } = data
    console.log(data)
    dispatch({ type: FETCTH_BY_SEARCH, payload: { data: searchResult } })
    dispatch({ type: END_LOADING })
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

export const createPost = (post, history) => async (dispatch) => {

  try {
    dispatch({ type: START_LOADING })
    const response = await api.createPost(post)
    const responseData = response.data

    history.push(`/posts/${responseData._id}`)
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