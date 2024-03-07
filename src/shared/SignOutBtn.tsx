"use client"

import { handleSignOut } from "@/actions/authActions";

export const SignOutBtn: React.FC = () => {
    return (
        <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleSignOut()}>
            Sign out
        </button>
    );
}