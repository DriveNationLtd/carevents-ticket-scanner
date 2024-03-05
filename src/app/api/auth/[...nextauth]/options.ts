import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

                    console.log(response.user);

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
            if (session.user) {
                // @ts-ignore
                session.user.id = token?.sub;
            }

            return Promise.resolve(session);
        },
        jwt: async ({ account, user, session, profile, token }) => {
            if (user) {
                token.sub = user.id;
            }

            return Promise.resolve(token);
        },
    }
};
