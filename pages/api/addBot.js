import db from "@/firebase";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore"; 

export default async function handler(req, res) {
  const { email, newBot } = req.body;

  // check if user email exists in collection
  const q = query(collection(db, "users"), where("email", "==", email));

  const querySnapshot = await getDocs(q);
    if (querySnapshot.size == 0) {
        return res.status(400).json({ message: "Could not find user" });
    } else {
        const links = await fetch("https://docudog-api.onrender.com/getlinks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: newBot.seedLink })
        });
        if (!links.ok) {
            return res.status(400).json({ message: "Could not get links" });
        }

        const data = await links.json();
        newBot.links = data.data;
        newBot.id = querySnapshot.docs[0].data().bots.length + 1;

        // date as mm/dd/yyyy
        const date = new Date();
        newBot.date = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

        let user = querySnapshot.docs[0].data();
        if (!user.bots) {
            user.bots = [];
        }
        user.bots.push(newBot);
        await setDoc(
            doc(db, "users", querySnapshot.docs[0].id), 
            user);
        return res.status(200).json({ 
            bots: user.bots
         });
    }
}
