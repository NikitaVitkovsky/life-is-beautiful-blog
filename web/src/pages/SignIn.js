import { useEffect } from "react"
import { useMutation, useApolloClient, gql } from '@apollo/client'

import UserForm from "../components/ui/UserForm"
import { Link, useNavigate } from "react-router-dom"

const SIGNIN_USER = gql`
    mutation signIn($email: String!, $username: String, $password: String!) {
        signIn(email: $email, username: $username, password: $password)
    }
`

const LocalStateIsLoggedInDocument = gql`
    query LocalStateIsLoggedIn {
        localState @client {
            user {
                isLoggedIn
            }
        }
    }
`

const SignIn = props => {
    // apollo client
    const client = useApolloClient()
    // renewed method of react router dom, deprecated "useHistory"
    const navigate = useNavigate()

    const [signIn, {loading, error}] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            // console.log the JSON Web Token when the mutation is complete
            localStorage.setItem('token', data.signIn)
            // update the local cache
            client.writeQuery({
                query: LocalStateIsLoggedInDocument,
                data: {
                    localState: {
                        __typename: "QueryLocalState",
                        user: {
                            __typename: "QueryLocalStateUser",
                            isLoggedIn: true,
                        },
                    },
                },
            })
            // redirect the user to the homepage
            navigate("/", {replace: true})
        }
    })

    useEffect(() => {
        document.title = 'Sign In — Life Is Beautiful Blog'
    })

    return (
        <>
            <UserForm action={signIn} formType="signin" />
            {loading && <p>Loading...</p>}
            {error && <p>Error logging to account!</p>}
            <div className="text-grey-dark mt-6">
                Do not have an account?{' '}
                <Link className="no-underline border-b border-blue-400 text-blue-400" to="../signup/">
                    Sign Up
                </Link>.
            </div>
        </>
    )
}

export default SignIn