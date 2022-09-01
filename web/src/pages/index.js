import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useQuery, gql } from "@apollo/client"

import Home from './Home'
import MyArticles from './MyArticles'
import Favorites from './Favorites'
import NotFound from './NotFound'
import Article from "./Article"
import SignUp from "./SignUp"
import SignIn from "./SignIn"

import Layout from "../components/layout/"
import LayoutAuth from "../components/layout-auth"

const LocalStateIsLoggedInDocument = gql`
    query LocalStateIsLoggedIn {
        localState @client {
            user {
                isLoggedIn
            }
        }
    }
`

const Pages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="myarticles" element={<MyArticles/>}/>
                        <Route path="favorites" element={<Favorites/>}/>
                        <Route path="article/:id" element={<Article/>}/>
                    </Route>

                    <Route element={<LayoutAuth/>}>
                        <Route path="signup" element={<SignUp/>}/>
                        <Route path="signin" element={<SignIn/>}/>
                    </Route>
                </Route>



                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Pages