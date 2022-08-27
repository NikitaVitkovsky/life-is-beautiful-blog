import { Link } from "react-router-dom"

import Navigation from "./Navigation"

import Logo from "../ui/Logo"

const Header = () => {
    return (
        <header className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg">
            <div id="header-content" className="h-full py-1.5 container mx-auto flex justify-between items-center">
                <Link to="/" className="flex justify-center items-center space-x-2 shadow-black transition duration-300 ease-in-out hover:drop-shadow-md">
                    <Logo/>
                    <span className="text-2xl text-white font-sans font-semibold capitalize ">life is beautiful</span>
                </Link>
                <Navigation />
            </div>

        </header>
    )
}

export default Header