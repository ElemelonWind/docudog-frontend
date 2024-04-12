import React, { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'

const Dashboard = ({
  session
}) => {

  const [bots, setBots] = useState([])

  useEffect(() => {
    const fetchBots = async () => {
      // const res = await fetch('/api/getBots', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     email: session?.user?.email
      //   })
      // })
      // const data = await res.json()
      // setBots(data)
      setBots([
        {
          id: 1,
          name: 'Bot 1',
          date: '2021-09-01',
          seedLink: 'https://www.google.com',
          links: [
            'https://www.google.com',
            'https://www.google.com',
          ]
        },
        {
          id: 2,
          name: 'Bot 2',
          date: '2021-09-02',
          seedLink: 'https://www.google.com',
          links: [
            'https://www.google.com',
            'https://www.google.com',
          ]
        }
      ])
    }

    fetchBots()
  }, [])

  return (
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
                  <p class="text-gray-700 text-base">
                    Seed Link: <a href={
                      bot.seedLink
                    }>{bot.seedLink}</a>
                  </p>
                </div>
                <div class="px-6 pt-4 pb-2">
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Created {bot.date}</span>
                </div>
              </div>
            ))}
            <div class="max-w-sm rounded overflow-hidden shadow-lg flex items-center ">
              <div class="px-6 py-4 items-center text-center">
                <button className="flex justify-center items-center">
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
  )
}

export default Dashboard