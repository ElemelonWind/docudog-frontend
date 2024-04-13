import React from "react";
import { useState, useEffect } from "react";
import ScrollContainer from "./ScrollContainer";
import TypingAnimation from "./TypingAnimation";

const Bot = ({ id, session }) => {
  const [bot, setBot] = useState({});
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBot = async () => {
      const res = await fetch(`/api/getBots`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
        }),
      });
      const data = await res.json();
      setBot(data.bots.find((b) => b.id === id));
    };

    fetchBot();
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    if (!message) {
        return;
    }
    setMessages([...messages, { message, type: "user" }]);
    sendMessage(message).then((botMessage) => {
        setMessages([...messages, { message, type: "user" }, { message: botMessage, type: "bot" }]);
        setLoading(false);
    });
    setMessage("");
}

  const sendMessage = async (message) => {
    console.log(messages)
    
    // add user message to messages
    
    // send message to bot
    // const res = await fetch(`/api/sendMessage`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     links: bot.links,
    //     history: messages,
    //     message,
    //   }),
    // });
    // const data = await res.json();
    await new Promise(r => setTimeout(r, 1000));
    const data = {
        message: "Hello!",
    }
    // add bot message to messages
    return data.message;
  }

  return (
    <div class="container mx-auto items-center my-auto flex justify-center h-5/6">
      <div class="flex justify-center px-6 my-12 items-center grow h-full">
        <div class="w-full lg:w-11/12 flex h-full shadow-lg">
          <div
            class="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/3 bg-cover rounded-l-lg"
            style={{
              backgroundImage:
                "url('https://source.unsplash.com/oWTW-jNGl9I/600x800')",
              backgroundPosition: "center",
            }}
          ></div>
          <div class="w-full lg:w-2/3 bg-white align-bottom h-full rounded-r-lg">
            <div class="flex-1 w-full h-full relative justify-center">
              <header class="bg-white p-4 text-gray-700 h-16 text-center w-full absolute rounded-tr-lg">
                <button class="absolute left-5 top-5"
                    onClick={() => {
                        window.location.href = '/dashboard';
                    }}
                >
                    <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 19l-7-7 7-7"
                        ></path>
                    </svg>
                </button>
                <h1 class="text-2xl font-semibold">{bot.name}</h1>
              </header>

              <div class="pt-16 h-full bg-gray-100 pb-20">
                <ScrollContainer>
                {
                    messages.map((m, i) => {
                        if (m.type == "bot") {
                            return ( 
                                <div class={"flex mb-4 cursor-pointer ml-4" + (i == 0 ? " mt-4" : "")} key={i}>
                                    <div class="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                                        <p class="text-gray-700">{m.message}</p>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div class={"flex mb-4 justify-end cursor-pointer mr-4" + (i == 0 ? " mt-4" : "")} key={i}>
                                    <div class="flex max-w-96 bg-red-500 text-white rounded-lg p-3 gap-3">
                                        <p>{m.message}</p>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
                {loading && 
                    <div class="flex mb-4 cursor-pointer ml-4">
                        <div class="flex max-w-96 bg-white rounded-lg px-4 py-4 gap-3">
                            <TypingAnimation />
                        </div>
                    </div>
                }
                </ScrollContainer>
              </div>

              <footer class="fixed bg-white p-0 w-full absolute bottom-0 h-20 flex items-center w-full rounded-br-lg">
                <div class="flex items-center p-4 items-center w-full">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    class="w-full p-2 rounded-md border border-gray-200 focus:outline-none focus:border-red-500"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSubmit();
                        }
                    }}
                  />
                  <button class="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
                    onClick={handleSubmit}
                  >
                    Send
                  </button>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bot;
