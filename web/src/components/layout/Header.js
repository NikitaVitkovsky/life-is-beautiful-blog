import { Link } from "react-router-dom"
import { useQuery, gql } from "@apollo/client"
import { useNavigate } from "react-router-dom"

import Navigation from "./Navigation"
import Logo from "../ui/Logo"

const IS_LOGGED_IN = gql`
    query LocalStateIsLoggedIn {
        localState @client {
            user {
                isLoggedIn
            }
        }
    }
`

const Header = () => {
    // query hook for user logged in state
    const { data, client } = useQuery(IS_LOGGED_IN)
    const navigate = useNavigate()

    const handleLogOut = () => {
        localStorage.removeItem('token')
        // clean application cache
        client.resetStore()
        // update local state
        client.writeQuery({
            query: IS_LOGGED_IN,
            data: {
                localState: {
                    __typename: "QueryLocalState",
                    user: {
                        __typename: "QueryLocalStateUser",
                        isLoggedIn: false,
                    },
                },
            },
        })
        // redirect to the homepage
        navigate("/", {replace: true})
    }

    return (
        <header className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg">
             <div id="header-content" className="h-full py-1.5 container mx-auto flex justify-between items-center">
                <Link to="/" className="flex justify-center items-center space-x-2 shadow-black transition duration-300 ease-in-out hover:drop-shadow-md">
                    <Logo/>
                    <span className="text-2xl text-white font-sans font-semibold capitalize ">life is beautiful</span>
                </Link>
                <Navigation />
                {data.localState.user.isLoggedIn ? (
                    <button onClick={handleLogOut}>Log Out</button>
                ):( <p>
                        <Link to={'/signin'}>Sign In</Link> or{' '}
                        <Link to={'/signup'}>Sign Up</Link>
                    </p>
                )}
            </div>
        </header>
    )

}

export default Header