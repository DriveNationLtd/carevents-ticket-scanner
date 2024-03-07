"use server"

import { signOut } from "@/auth"
import { apiAuthPrefix } from "@/routes"

export const handleSignOut = async () => {
    await signOut({
        redirectTo: `${apiAuthPrefix}/signin`,
        redirect: false,
    })
}