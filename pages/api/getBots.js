import db from "@/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; 

export default async function handler(req, res) {
  const { email } = req.body;

  // check if user email exists in collection
  const q = query(collection(db, "users"), where("email", "==", email));

  const querySnapshot = await getDocs(q);
    if (querySnapshot.size == 0) {
        return res.status(400).json({ message: "Could not find user" });
    } else {
        const user = querySnapshot.docs[0].data();
        return res.status(200).json({ 
            bots: user.bots
         });
    }
}
