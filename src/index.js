import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { GoogleOAuthProvider } from '@react-oauth/google'


import reducers from './reducers'
import './index.css'
import App from './App'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
  <GoogleOAuthProvider
    clientId='1050909847905-r7l6fhvqmh0j859afhau61s8arhm0gmg.apps.googleusercontent.com'
  >
    <Provider store={store} >
      <App />
    </Provider>
  </GoogleOAuthProvider>
  , document.getElementById('root')
)