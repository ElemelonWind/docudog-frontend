import React, { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'

const Dashboard = ({
  session
}) => {

  const [bots, setBots] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newBot, setNewBot] = useState({
    name: '',
    seedLink: ''
  })

  const addBot = async () => {
    const res = await fetch('/api/addBot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: session?.user?.email,
        newBot
      })
    })
    const data = await res.json()
    setBots(data.bots)
    setShowModal(false)
  }

  useEffect(() => {
    console.log(session);
    const fetchBots = async () => {
      const res = await fetch('/api/getBots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: session?.user?.email
        })
      })
      const data = await res.json()
      setBots(data.bots)
    }

    fetchBots()
  }, [])

  return (
    <>
    <div className="container mx-auto">
    <div className="flex justify-center px-6 my-12">
      <div className="w-full xl:w-3/4 lg:w-11/12 bg-white p-5 rounded-lg">
        <div className="flex">
          <h1 className="text-2xl font-semibold text-gray-800 w-full">Welcome, {session?.user?.firstName}!</h1>
          <div className="justify-items-end">
          <button onClick={() => {
            signOut()
            window.location.href = '/login'
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-max"
          >Sign out</button>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            {bots.map(bot => (
              <div class="max-w-sm rounded overflow-hidden shadow-lg" key={bot.id}>
                <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2">{bot.name}</div>
                  <p class="text-blue-700 text-base">
                    <a href={
                      bot.seedLink
                    }>{bot.seedLink}</a>
                  </p>
                </div>
                <div class="px-6 pt-4 pb-2">
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{bot.date}</span>
                </div>
              </div>
            ))}
            <div class="max-w-sm rounded overflow-hidden shadow-lg flex items-center ">
              <div class="px-6 py-4 items-center text-center">
                <button className="flex justify-center items-center"
                  onClick={() => {
                    setShowModal(true)
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-1/3 h-1/3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </button>
                <div class="font-bold text-xl mb-2 text-gray-600">Create New Bot</div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  {showModal && (
    <div tabindex="-1" aria-hidden="true" class="flex backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-2xl max-h-full">
          <div class="relative bg-white rounded-lg shadow">
              <div class="flex items-center justify-between p-4 md:p-5">
                  <h3 class="text-xl font-semibold text-gray-900">
                      Add a new bot
                  </h3>
                  <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setShowModal(false)}
                  >
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span class="sr-only">Close modal</span>
                  </button>
              </div>
              <div class="p-4 md:p-5 space-y-4">
                  <form>
                      <div class="space-y-4">
                          <div>
                              <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                              <input type="text" id="name" name="name" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                onChange={(e) => setNewBot({
                                  ...newBot,
                                  name: e.target.value
                                })}
                              />
                          </div>
                          <div>
                              <label for="seedLink" class="block text-sm font-medium text-gray-700">Seed Link</label>
                              <input type="text" id="seedLink" name="seedLink" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                onChange={(e) => setNewBot({
                                  ...newBot,
                                  seedLink: e.target.value
                                })}
                              />
                          </div>
                      </div>
                  </form>
              </div>
              <div class="flex items-center p-4 md:p-5">
                  <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => addBot()}
                  >Confirm</button>
              </div>
          </div>
      </div>
  </div>
  )}
  </>
  )
}

export default Dashboard