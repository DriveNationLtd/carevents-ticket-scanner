'use client'
import { signOut } from "next-auth/react";

export const SignOutBtn: React.FC = () => {
    const handleSignOut = async () => {
        await signOut({ redirect: true, callbackUrl: '/' })
    }

    return (
        <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSignOut}>
            Sign out
        </button>
    );
}