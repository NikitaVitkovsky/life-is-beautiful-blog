import {useQuery, gql} from '@apollo/client'
import {Link} from "react-router-dom"

import ArticleFeed from '../components/ArticleFeed'

// our GraphQL query, stored as a variable
const GET_ARTICLES = gql`
    query ArticleFeed($cursor: String) {
        articleFeed(cursor: $cursor) {
            cursor
            hasNextPage
            articles {
                id
                createdAt
                title
                content
                favoriteCount
                author {
                    username
                    id
                    avatar
                }
            }
        }
    }
`

const Home = () => {
// query hook
    const {data, loading, error, fetchMore} = useQuery(GET_ARTICLES)
    // if the data is loading, display a loading message
    if (loading) return <p>Loading...</p>
    // if there is an error fetching the data, display an error message
    if (error) return <p>Error!</p>
    // if the data is successful, display the data in our UI
    return <ArticleFeed articles={data.articleFeed.articles} />
}

export default Home