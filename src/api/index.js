import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use(req => {
  if (localStorage.getItem('profile')) {
    const token = JSON.parse(localStorage.getItem('profile')).token
    console.log(token)
    req.headers.Authorization = `Bearer ${token}`
  }

  return req
})

// const postUrl = `http://localhost:5000/posts`
const postUrl = `/posts`
const authUrl = `/user`

export const fetchPosts = () => {
  console.log('api')
  // API.get(`${postUrl}?page=${page}`)
  axios.get('http://localhost:5000/posts')
}

export const fetchPostBySearch =
  searchQuery => API.get(`${postUrl}/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)

export const fetchPostByTitle =
  searchQuery => API.get(`${postUrl}/byTitle?=${searchQuery.search}`)

export const createPost = (newPost) => API.post(postUrl, newPost)

export const updatePost =
  (postId, updatedPost) => API.patch(`${postUrl}/${postId}`, updatedPost)

export const deletePost = (id) => API.delete(`${postUrl}/${id}`,)

export const likePost = (id) => API.patch(`${postUrl}/${id}/likePost`)

export const signIn = (formData) => API.post(`${authUrl}/signIn`, formData)

export const signUp = (formData) => API.post(`${authUrl}/signUp`, formData)