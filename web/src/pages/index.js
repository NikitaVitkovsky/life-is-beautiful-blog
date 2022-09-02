import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoutes from "../utils/PrivateRoutes"

import Home from './Home'
import MyArticles from './MyArticles'
import Favorites from './Favorites'
import NotFound from './NotFound'
import Article from "./Article"
import SignUp from "./SignUp"
import SignIn from "./SignIn"

import Layout from "../components/layout/"
import LayoutAuth from "../components/layout-auth"

const Pages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route element={<PrivateRoutes />}>
                            <Route path="myarticles" element={<MyArticles/>}/>
                            <Route path="favorites" element={<Favorites/>}/>
                        </Route>

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