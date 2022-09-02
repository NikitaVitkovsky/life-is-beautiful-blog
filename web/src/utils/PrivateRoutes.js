import { useNavigate, Outlet, Navigate } from "react-router-dom"
import { useQuery, gql } from "@apollo/client"

const IS_LOGGED_IN = gql`
    query LocalStateIsLoggedIn {
        localState @client {
            user {
                isLoggedIn
            }
        }
    }
`

const PrivateRoutes = () => {

    const { data, error, loading } = useQuery(IS_LOGGED_IN)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error! Article not found</p>

    return (
        data.localState.user.isLoggedIn ? <Outlet /> : <Navigate to='/signin' />
    )
}

export default PrivateRoutes