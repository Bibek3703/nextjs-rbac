"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import signOut from "../_actions/signout";
import { useRouter } from "next/navigation";

export default function SignoutButtton(
    { label = "Sign Out", ...props }: {
        label?: string;
    },
) {
    const router = useRouter();
    const handleSignOut = async () => {
        await signOut();
        router.push("/");
    };
    return (
        <Button onClick={handleSignOut} {...props}>
            {label}
        </Button>
    );
}
