import React from 'react'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Head from 'next/head'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = async () => {
        if (!email || !password) {
            alert('Please fill in all fields')
            return
        }

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password
        })

        if (result.error) {
            alert(result.error)
        } else {
            window.location.href = './dashboard'
        }
    }

    return (
		<>
		<Head>
			<title>Login</title>
			<meta name="description" content="Login to your account" />
		</Head>
        <div className="container mx-auto items-center my-auto flex justify-center">
			<div className="flex justify-center px-6 my-12 items-center grow">
				<div className="w-full xl:w-3/4 lg:w-11/12 flex py-12">
					<div
						className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
						style={{ 
							backgroundImage: "url('https://source.unsplash.com/K4mSJ7kc0As/600x800')",
							backgroundPosition: "center",
						}}
					></div>
					<div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
						<h3 className="pt-4 mt-10 text-3xl text-center">Welcome Back!</h3>
						<form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
							<div className="mb-4">
								<label className="block mb-2 text-md font-bold text-gray-700" for="username">
									Username
								</label>
								<input
									className="w-full px-3 py-2 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="username"
									type="text"
									placeholder="Username"
                                    onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="mb-4">
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
							<div className="mb-6 text-center">
								<button
									className="transition duration-500 border-2 border-blue-400 text-lg w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:border-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline"
									type="button"
                                    onClick={login}
								>
									Sign In
								</button>
							</div>
							<hr className="mb-6 border-t" />
							<div className="text-center">
								<a
									className="inline-block text-md text-blue-500 align-baseline hover:text-blue-800"
									href="./register"
								>
									Create an Account!
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

export default Login