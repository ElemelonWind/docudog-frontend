import React from 'react'
import { useState, useEffect } from 'react'

const Bot = ({id, session}) => {

    const [bot, setBot] = useState({})
    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        const fetchBot = async () => {
            const res = await fetch(`/api/getBots`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: session?.user?.email,
                    })
                }
            )
            const data = await res.json()
            setBot(data.bots.find(b => b.id === id))
        }

        fetchBot()
    }, [])

  return (
    <div class="container mx-auto items-center my-auto flex justify-center h-5/6">
			<div class="flex justify-center px-6 my-12 items-center grow h-full">
				<div class="w-full xl:w-3/4 lg:w-11/12 flex h-full">
					<div
						class="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
						style={{
                            backgroundImage: "url('https://source.unsplash.com/oWTW-jNGl9I/600x800')",
                            backgroundPosition: "center",
                        }}
					></div>
					<div class="w-full lg:w-1/2 bg-white align-bottom h-full rounded-r-lg">
						<div class="flex-1 w-full h-full relative justify-center">
                        <header class="bg-white p-4 text-gray-700 h-16 text-center w-full absolute rounded-tr-lg">
                            <h1 class="text-2xl font-semibold">{bot.name}</h1>
                        </header>
                        
                        <div class="overflow-y-auto pt-20 h-full bg-gray-100 px-2 pb-20">
                        
                        <div class="flex justify-end mb-4 cursor-pointer">
                            <div class="flex max-w-96 bg-red-500 text-white rounded-lg p-3 gap-3">
                            <p>Absolutely! Cant wait for our pizza date. 🍕</p>
                            </div>
                        </div>
                        <div class="flex mb-4 cursor-pointer">
                            <div class="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                            <p class="text-gray-700">Hoorayy!!</p>
                            </div>
                        </div>
                        
                        </div>
                        
                        <footer class="fixed bg-white p-0 w-full absolute bottom-0 h-20 flex items-center w-full rounded-br-lg">
                            <div class="flex items-center p-4 items-center w-full">
                                <input type="text" placeholder="Type a message..." class="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-red-500"/>
                                <button class="bg-red-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
                            </div>
                        </footer>
                    </div>
					</div>
				</div>
			</div>
		</div>
  )
}

export default Bot