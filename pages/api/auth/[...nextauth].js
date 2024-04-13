import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { compare } from "bcrypt";
import db from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore"; 

export default NextAuth({
    session: {
      jwt: true,
    },
    providers: [
      CredentialsProvider({
        async authorize(credentials) {
          // return user object
          const { email, password } = credentials;
          const q = query(collection(db, "users"), where("email", "==", email));
          const querySnapshot = await getDocs(q);
          if (querySnapshot.size === 0) {
            console.log("No such user!")
            return null;
          }
          const user = querySnapshot.docs[0].data();
          const isValid = await compare(password, user.password);
          if (!isValid) {
            console.log("Invalid password!")
            return null;
          }
          return user;
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async jwt({ token, account, user, trigger, session }) {
        // update token fields with user data
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.firstName = user.firstName;
          token.lastName = user.lastName;
        }
        return token;
      },
      async session({ session, token }) {
        // update session.user fields with token data
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        return session;
      },
    },
  });