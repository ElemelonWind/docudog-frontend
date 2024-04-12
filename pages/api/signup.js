import db from "@/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; 
import { hash } from "bcrypt";

export default async function handler(req, res) {
  const { email, password, firstName, lastName } = req.body;

  // check if user email exists in collection
  const q = query(collection(db, "users"), where("email", "==", email));

  const querySnapshot = await getDocs(q);
  if (querySnapshot.size > 0) {
    return res.status(400).json({ message: "User already exists" });
  } else {
    // add user to collection
    hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      } else {
        const user = {
          email,
          password: hash,
          firstName,
          lastName,
        };
        addDoc(collection(db, "users"), user);
        return res.status(200).json({ message: "User created" });
      }
    });
  }
}
