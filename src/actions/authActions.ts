"use server"

import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth";
import { cookies } from 'next/headers'

// process.env.HEADLESS_CMS_API_URL ?? 
const API_URL = "https://www.carevents.com";

export const verifyUser = async (credentials: { email: string; password: string }) => {
    try{
        const response = await fetch(`${API_URL}/wp-json/ticket_scanner/v1/verify_user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (response.ok) {
            return JSON.parse(await response.json());
        }
    } catch (error) {
        console.error(error)
        return error;
    }
};

export const getUserDetails = async (id: string) => {
    let url = `https://www.carevents.com/wp-json/ticket_scanner/v1/get_user_data`
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: id }),
    });

    if (response.ok) {
        return JSON.parse(await response.json());
    }

    return null;
}

export const handleSignOut = async () => {
    // manually clear all cookies
    // const cookieStore = cookies()

    // cookieStore.getAll().map(cookie => {
    //     cookieStore.delete(cookie.name)
    // })
    
    await signOut()
}

export const handleSignIn = async (credentials: {
    email: string | undefined;
    password: string | undefined;
}) => {
    try {
        await signIn("credentials", {
            email: credentials.email,
            password: credentials.password,
            redirectTo: '/dashboard',
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }

        throw error;
    }
    // const response = await signIn("credentials", credentials);
    // return response;
}