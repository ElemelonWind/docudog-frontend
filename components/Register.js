import React from 'react'
import { useState } from 'react'
import Head from 'next/head'

const Register = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [c_password, setCPassword] = useState('')

    const register = async () => {
        if (!firstName || !lastName || !email || !password || !c_password) {
            alert('Please fill in all fields')
            return
        }
        if (password !== c_password) {
            alert('Passwords do not match')
            return
        }

        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password
            })
        })

        const data = await res.json()

        if (data.message) {
            alert(data.message)
        } else {
            router.push('/login')
        }
    }

  return (
    <>
    <Head>
        <title>Register</title>
        <meta name="description" content="Register for an account" />
    </Head>
    <div className="container mx-auto flex justify-center items-center my-auto">
        <div className="flex justify-center px-6 my-12 items-center grow">
            <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                <div
                    className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                    style={{ backgroundImage: "url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')",
                    backgroundPosition: "center"}}
                ></div>
                <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                    <h3 className="pt-4 mt-10 text-3xl text-center">Create an Account!</h3>
                    <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                        <div className="mb-4 md:flex md:justify-between">
                            <div className="mb-4 md:mr-2 md:mb-0 grow">
                                <label className="block mb-2 text-md font-bold text-gray-700" for="firstName">
                                    First Name
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="firstName"
                                    type="text"
                                    placeholder="First Name"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="md:ml-2 grow">
                                <label className="block mb-2 text-md font-bold text-gray-700" for="lastName">
                                    Last Name
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-md font-bold text-gray-700" for="email">
                                Email
                            </label>
                            <input
                                className="w-full px-3 py-2 mb-3 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4 md:flex md:justify-between">
                            <div className="mb-4 md:mr-2 md:mb-0 grow">
                                <label className="block mb-2 text-md font-bold text-gray-700" for="password">
                                    Password
                                </label>
                                <input
                                    className="w-full px-3 py-2 mb-3 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="******************"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="md:ml-2 grow">
                                <label className="block mb-2 text-md font-bold text-gray-700" for="c_password">
                                    Confirm Password
                                </label>
                                <input
                                    className="w-full px-3 py-2 mb-3 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="c_password"
                                    type="password"
                                    placeholder="******************"
                                    onChange={(e) => setCPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-6 text-center">
                            <button
                                className="transition duration-500 border-2 border-yellow-400 hover:border-yellow-600 text-lg w-full px-4 py-2 font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-700 focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={register}
                            >
                                Register Account
                            </button>
                        </div>
                        <hr className="mb-6 border-t" />
                        <div className="text-center">
                            <a
                                className="inline-block text-md text-yellow-500 align-baseline hover:text-yellow-800"
                                href="./login"
                            >
                                Already have an account? Login!
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Register