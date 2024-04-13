import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import logo from "../public/logo.png";

const Dashboard = ({ session }) => {
  const [bots, setBots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [helpModal, setHelpModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newBot, setNewBot] = useState({
    name: "",
    seedLink: "",
  });

  const addBot = async () => {
    setLoading(true);
    const res = await fetch("/api/addBot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session?.user?.email,
        newBot,
      }),
    });
    if (!res.ok) {
      alert("Error adding bot. Please try again.");
      return;
    }
    const data = await res.json();
    setBots(data.bots);
    setLoading(false);
    setShowModal(false);
  };

  useEffect(() => {
    console.log(session);
    const fetchBots = async () => {
      const res = await fetch("/api/getBots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
        }),
      });
      const data = await res.json();
      setBots(data.bots);
    };

    fetchBots();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
      </Head>
      <div className="container mx-auto h-full items-center my-auto flex justify-center h-5/6">
        <div className="flex justify-center px-6 py-12 h-full items-center grow w-full">
          <div className="w-full xl:w-3/4 lg:w-11/12 bg-white rounded-lg h-full relative shadow-lg">
            <div className="absolute h-32 w-full bg-white rounded-t-lg">
              <div className="flex py-10 px-12 w-full h-32">
                <h1 className="text-4xl font-bold text-gray-800 w-full">
                  Welcome, {session?.user?.firstName}!
                </h1>
                {/* <Image src={logo} alt="logo" width={300} height={30} /> */}
                <div className="justify-end flex gap-4 w-full h-full">
                  <button
                    onClick={() => {
                      setHelpModal(true);
                    }}
                    className="h-full transition duration-500 bg-purple-500 hover:border-purple-600 border-2 border-purple-400 hover:bg-purple-700 text-white text-lg font-bold py-2 px-8 rounded-full w-max shadow-md"
                  >
                    Help
                  </button>
                  <button
                    onClick={() => {
                      signOut();
                      window.location.href = "/login";
                    }}
                    className="h-full transition duration-500 bg-purple-500 hover:border-purple-600 border-2 border-purple-400 hover:bg-purple-700 text-white text-lg font-bold py-2 px-8 rounded-full w-max shadow-md"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
            <div className="h-full overflow-y-auto">
              <div className="grid mt-4 pt-28 gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mx-12 mb-4">
                {bots.map((bot) => (
                  <button
                    className="border-2 border-gray-200 max-w-sm rounded overflow-hidden shadow-xl hover:scale-105 transition duration-500 text-left"
                    key={bot.id}
                    onClick={() => {
                      window.location.href = `/bot?id=${bot.id}`;
                    }}
                  >
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{bot.name}</div>
                      <p className="text-purple-700 text-base">
                        <a
                          href={bot.seedLink}
                          classNameName="text-purple-700 hover:text-purple-900"
                        >
                          {bot.seedLink}
                        </a>
                      </p>
                    </div>
                    <div className="px-6 pt-4 pb-4">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {bot.date}
                      </span>
                    </div>
                  </button>
                ))}
                <button
                  className="border-2 border-gray-200 max-w-sm rounded overflow-hidden shadow-xl flex items-center hover:scale-105 transition duration-500"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  <div className="px-6 py-4 items-center text-center">
                    <div className="flex justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="gray"
                        className="w-1/3 h-1/3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </div>
                    <div className="font-bold text-xl mb-2 text-gray-600">
                      Create New Bot
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          tabindex="-1"
          aria-hidden="true"
          className="flex backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow py-4 px-6 border-2 border-gray-200">
              <div className="flex items-center justify-between p-4 md:p-5">
                <h3 className="text-3xl font-semibold text-gray-900">
                  Add a New Bot
                </h3>
                <button
                  type="button"
                  className="transition duration-500 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-md w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="space-y-4 p-4 md:p-5">
                <form>
                  <div className="space-y-4">
                    <div>
                      <label
                        for="name"
                        className="block text-md font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 md:text-md"
                        onChange={(e) =>
                          setNewBot({
                            ...newBot,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label
                        for="seedLink"
                        className="block text-md font-medium text-gray-700"
                      >
                        Seed Link
                      </label>
                      <input
                        type="text"
                        id="seedLink"
                        name="seedLink"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 md:text-md"
                        onChange={(e) =>
                          setNewBot({
                            ...newBot,
                            seedLink: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="flex items-center p-4 md:p-5">
                <button
                  type="button"
                  className="transition duration-500 hover:border-purple-600 border-2 border-purple-400 bg-purple-500 hover:bg-purple-700 text-white text-lg font-bold py-2 px-8 rounded-full w-max shadow-md"
                  onClick={() => addBot()}
                >
                  Confirm
                </button>
              </div>
              {loading && <div className="px-4 mb-4 text-md">Generating bot... please wait</div>}
            </div>
          </div>
        </div>
      )}
      {helpModal && (
        <div
          tabindex="-1"
          aria-hidden="true"
          className="flex backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow py-4 px-6 border-2 border-gray-200">
              <div className="flex items-center justify-between p-4 md:p-5">
                <h3 className="text-3xl font-semibold text-gray-900">
                  What is DocuDog?
                </h3>
                <button
                  type="button"
                  className="transition duration-500 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-md w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setHelpModal(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="space-y-4 p-4 md:p-5">
                <div className="space-y-2">
                  <p className="text-lg text-gray-700">
                    DocuDog is a tool that allows you to create chat bots based
                    on documentation or specs. You can create a bot by providing
                    a &quot;seed link&quot;, and DocuDog will scrape the data
                    from all associated links, providing you with a chat bot
                    that has the capabilities to answer any questions you have!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
