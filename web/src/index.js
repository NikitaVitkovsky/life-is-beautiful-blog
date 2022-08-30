import React from 'react'
import ReactDOM from 'react-dom/client'

// import Apollo Client libraries
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'

import './index.css'
import App from './App'

// configure our API URI & cache
const uri = process.env.REACT_APP_API_URI
const cache = new InMemoryCache()

// configure Apollo Client
const client = new ApolloClient({
    uri,
    cache,
    connectToDevTools: true
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
          <App />
      </ApolloProvider>
  </React.StrictMode>
)
