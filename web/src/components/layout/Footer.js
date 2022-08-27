import Logo from "../ui/Logo";
import {Link} from "react-router-dom";
import Navigation from "./Navigation";

const Footer = () => {
    return (
        <footer className="sticky top-[100vh] w-full bg-gradient-to-r from-violet-500 to-blue-700 shadow-lg">
            <div id="footer-content" className="grid grid-rows-2 items-center divide-y divide-white/25 h-full text-white">
                <div className="grid grid-cols-2 pt-3 pb-1 flex justify-center">
                    <Link to="/" className="flex justify-center space-x-2 shadow-black transition duration-300 ease-in-out hover:drop-shadow-md">
                        <Logo/>
                        <span className="text-2xl text-white font-sans font-semibold capitalize ">life is beautiful</span>
                    </Link>
                    <Navigation />
                </div>
                <div className="text-center pt-2">Copyright © 2022 Life is beautiful - blog</div>
            </div>
        </footer>
    )
}

export default Footer