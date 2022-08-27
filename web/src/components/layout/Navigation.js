import { Link } from "react-router-dom"

const Navigation = () => {
    return (
        <nav className="flex justify-center space-x-2.5 text-lg text-slate-200 shadow-black">
            <Link to="/" className="px-1.5 py-0.5 transition duration-200 ease-in-out hover:text-white hover:drop-shadow-md"><span>Feed</span></Link>
            <Link to="/myarticles" className="px-1.5 py-0.5 transition duration-200 ease-in-out hover:text-white hover:drop-shadow-md"><span>My Articles</span></Link>
            <Link to="/favorites" className="px-1.5 py-0.5 transition duration-200 ease-in-out hover:text-white hover:drop-shadow-md"><span>Favorites</span></Link>

        </nav>
    )
}

export default Navigation