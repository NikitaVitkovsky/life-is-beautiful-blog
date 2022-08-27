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
                            src="https://pixabay.com/get/gf08c24d99e8b746039374064781c0b103eb0d7c1a0b147f0147a7ee9721b15ce634716e3a3ec21a07eae482a99b088663d4e86a8ff46b010fd0353319cf6607f8fcb5bbd5155758d1349e436c2399d67_640.jpg"
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