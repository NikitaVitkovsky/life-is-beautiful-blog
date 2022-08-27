import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './Home'
import MyArticles from './MyArticles'
import Favorites from './Favorites'
import NotFound from './NotFound'

import Layout from "../components/layout/"

const Pages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="myarticles" element={<MyArticles />} />
                    <Route path="favorites" element={<Favorites />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Pages