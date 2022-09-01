import { Outlet } from "react-router-dom"

const LayoutAuth = () => {
    return (
        <div id="wrapper">
            <main className="bg-gradient-to-r from-sky-200 to-indigo-200 min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <Outlet />
                </div>
            </main>

        </div>
    )
}

export default LayoutAuth