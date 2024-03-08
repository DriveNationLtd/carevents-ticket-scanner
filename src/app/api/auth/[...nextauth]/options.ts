import { getUserDetails, verifyUser } from "@/actions/authActions";
import { NextAuthConfig, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            first_name: string;
            last_name: string;
            username: string;
            roles: string[];
        } & DefaultSession["user"];
    }
}

export const options: NextAuthConfig = {
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            name: "Email",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (credentials) {
                    // @ts-ignore
                    const response = await verifyUser(credentials);

                    if (response && response.success) {
                        return response.user;
                    }
                }

                return null;
            },
        }),
    ],
    callbacks: {
        session: async ({ session, token }) => {
            if (session.user && token?.sub) {
                session.user.id = token?.sub;
                const data = await getUserDetails(token.sub);
                if (data) {
                    session.user.first_name = data.user.first_name;
                    session.user.last_name = data.user.last_name;
                    session.user.username = data.user.username;
                    session.user.roles = data.user.roles;
                }
            }

            return session;
        },
        jwt: async ({ token }) => {
            return token;
        },
    },
    pages: {
        // TODO: Add custom auth pages
    },
};