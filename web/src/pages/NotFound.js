import {Link} from "react-router-dom"

const NotFound = () => {
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="px-4 lg:py-12">
                <div className="lg:gap-4 lg:flex">
                    <div
                        className="flex flex-col items-center justify-center md:py-24 lg:py-32"
                    >
                        <h1 className="font-bold text-blue-600 text-9xl">404</h1>
                        <p
                            className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl"
                        >
                            <span className="text-red-500">Oops!</span> Page not found
                        </p>
                        <p className="mb-8 text-center text-gray-500 md:text-lg">
                            The page you’re looking for doesn’t exist.
                        </p>
                        <Link to="/" className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100 transition ease-in delay-150 hover:bg-blue-600 hover:text-white">Go home</Link>
                    </div>
                    <div className="mt-4">
                        <img
                            src="https://images.unsplash.com/photo-1628152184828-a1c78fbb6b1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"
                            alt="img"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound