"use server"

import { signOut } from "@/auth"
import { apiAuthPrefix } from "@/routes"

const API_URL = process.env.HEADLESS_CMS_API_URL;

export const verifyUser = async (credentials: { email: string; password: string }) => {
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

export const getUserDetails = async (id: string) => {
    let url = `${API_URL}/wp-json/ticket_scanner/v1/get_user_data`
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
    await signOut({
        redirectTo: `${apiAuthPrefix}/signin`,
        redirect: true,
    })
}