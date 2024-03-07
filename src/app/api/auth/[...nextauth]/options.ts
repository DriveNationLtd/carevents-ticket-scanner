import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            first_name: string;
            last_name: string;
            roles: string[];
        } & DefaultSession["user"];
    }
}

const API_URL = process.env.HEADLESS_CMS_API_URL;

const verifyUser = async (credentials: { email: string; password: string }) => {
    let url = `${API_URL}/wp-json/ticket_scanner/v1/verify_user`
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    if (response.ok) {
        return JSON.parse(await response.json());
    }

    return null;
};

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Email",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (credentials) {
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
            }

            return session;
        },
        jwt: async ({ token }) => {
            return token;
        },
    }
};
