import { AppleIcon, GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { signinWithOAuth } from "../_actions/signinWithOAuth";
import { ProviderType } from "@/types";
import { Loader2 } from "lucide-react";

function ProviderIcon({ provider }: { provider: ProviderType }) {
    switch (provider) {
        case "apple":
            return <AppleIcon />;
        case "google":
            return <GoogleIcon />;
        default:
            return null;
    }
}

export default function OAuthButton(
    { provider, disabled = false }: {
        provider: ProviderType;
        disabled?: boolean;
    },
) {
    const [loading, setLoading] = useState(false);

    const handleOAuthSignIn = async () => {
        try {
            setLoading(true);
            await signinWithOAuth({
                provider,
            });
        } catch (error: unknown) {
            // alert(error?.message);
            console.log({ error });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="outline"
            className="w-full capitalize"
            onClick={handleOAuthSignIn}
            disabled={disabled || loading}
        >
            {loading
                ? <Loader2 className="animate-spin w-6 h-6" />
                : <ProviderIcon provider={provider} />}
            Login with {provider}
        </Button>
    );
}
