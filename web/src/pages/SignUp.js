import { useMutation, useApolloClient, gql } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

import UserForm from "../components/ui/UserForm"

const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
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

const SignUp = props => {
    // apollo client
    const client = useApolloClient()
    // renewed method of react router dom, deprecated "useHistory"
    const navigate = useNavigate()

    // mutation hook
    const [signUp, {loading, error}] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            // console.log the JSON Web Token when the mutation is complete
            localStorage.setItem('token', data.signUp)
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
        document.title = 'Sign Up — Life Is Beautiful Blog'
    })
    return (
        <>
            <UserForm action={signUp} formType="signup" />
            {loading && <p>Loading...</p>}
            {error && <p>Error creating an account!</p>}
            <div className="text-grey-dark mt-6">
                Already have an account?{' '}
                <Link className="no-underline border-b border-blue-400 text-blue-400" to="../signin/">
                    Log in
                </Link>.
            </div>
        </>
    )
}

export default SignUp