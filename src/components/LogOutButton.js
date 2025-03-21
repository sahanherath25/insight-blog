"use client";

import { signOut } from "next-auth/react"; // Import signOut from next-auth/react

export default function LogoutButton() {
    const handleLogout = async () => {
        await signOut({
            callbackUrl: '/', // Redirect to home page after logout
        });
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}