import React from 'react'
import ReactDOM from 'react-dom/client'

// import Apollo Client libraries
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    createHttpLink,
    gql
} from '@apollo/client'
import { setContext } from "@apollo/client/link/context"

import './index.css'
import App from './App'

// configure our API URI & cache
const uri = process.env.REACT_APP_API_URI
const httpLink = createHttpLink({uri})
const cache = new InMemoryCache()

// pass token from localstorage to headers
const authlink = setContext((_, {headers}) => {
    return {
        ...headers,
        authorization: localStorage.getItem('token') || ''
    }
})

// configure Apollo Client
const client = new ApolloClient({
    link: authlink.concat(httpLink),
    cache,
    resolvers: {},
    connectToDevTools: true
})
//localstate schema
const LocalStateIsLoggedInDocument = gql`
    query LocalStateIsLoggedIn {
        localState @client {
            user {
                isLoggedIn
            }
        }
    }
`

//write the cache data on initial load
cache.writeQuery({
        query: LocalStateIsLoggedInDocument,
        data: {
            localState: {
                __typename: "QueryLocalState",
                user: {
                    __typename: "QueryLocalStateUser",
                    isLoggedIn: false,
                },
            },
        },
    }
)


client.onResetStore(() => cache.writeQuery({
    query: LocalStateIsLoggedInDocument,
    data: {
        localState: {
            __typename: "QueryLocalState",
            user: {
                __typename: "QueryLocalStateUser",
                isLoggedIn: !!localStorage.getItem('token')
            },
        },
    }
}))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </React.StrictMode>
)
