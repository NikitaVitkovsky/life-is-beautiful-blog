import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './Home'
import MyArticles from './MyArticles'
import Favorites from './Favorites';

const Pages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/myarticles" element={<MyArticles />} />
                <Route path="favorites" element={<Favorites />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Pages