import { useState } from "react"

const UserForm = props => {

    const [values, setValues] = useState(null)

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.action({
            variables: {
                ...values
            }
        })
    }

    return (
        <div className="bg-white px-6 py-8 rounded-lg shadow-md text-black w-full">
            <h2 className="mb-8 text-3xl text-center">{props.formType === 'signup' ? 'Sign Up' : 'Sign In'}</h2>

            <form onSubmit={(e) => handleSubmit(e)}>
                {props.formType === 'signup' && (
                    <>
                        <label htmlFor="username">Username:</label>
                        <input
                            onChange={handleChange}
                            required
                            type="text"
                            className="block border border-gray-200 w-full p-3 rounded mb-4"
                            id="username"
                            name="username"
                        />
                    </>
                )}
                <label htmlFor="email">Email:</label>
                <input
                    onChange={handleChange}
                    required
                    type="email"
                    className="block border border-gray-200 w-full p-3 rounded mb-4"
                    id="email"
                    name="email"
                    placeholder="Email"/>
                <label htmlFor="password">Password:</label>
                <input
                    onChange={handleChange}
                    required
                    type="password"
                    className="block border border-gray-200 w-full p-3 rounded mb-4"
                    name="password"
                    id="password"
                    placeholder="Password"/>
                {props.formType === 'signup' && (
                    <>
                        <label htmlFor="confirm_password">Confirm password:</label>
                        <input
                            onChange={handleChange}
                            required
                            type="password"
                            className="block border border-gray-200 w-full p-3 rounded mb-4"
                            name="confirm_password"
                            id="confirm_password"
                            placeholder="Confirm Password"/>
                    </>
                )}


                <button type="submit"
                        className="py-3 w-full bg-green-500 rounded-md text-white text-center transition ease-in-out duration-200 hover:bg-green-600">
                    {props.formType === 'signup' ? 'Create Account' : 'Login'}
                </button>
            </form>
        </div>
    )
}

export default UserForm