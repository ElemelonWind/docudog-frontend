export default async function handler(req, res) {
    const { links, history, message } = req.body;

    // convert history to form that can be sent to bot
    const formattedHistory = history.map((m) => {
        return {
            role: m.type,
            parts: [m.message],
        };
    });

    // send message to bot
    const response = await fetch("https://docudog-api.onrender.com/sendmessage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: message,
            history: formattedHistory,
            links: links,
        }),
    });

    // get response from bot
    const data = await response.json();
    res.status(200).json(data);
}