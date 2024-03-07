import NextAuth from "next-auth"
import { options } from "./app/api/auth/[...nextauth]/options";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth(options);