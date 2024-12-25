"use server"

import { appOAuthProviders } from "@/app/constants";
import { ProviderType } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { SignInWithOAuthCredentials } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signinWithOAuth(credientials: SignInWithOAuthCredentials){

    if(!credientials || !credientials.provider){
        throw new Error("OAuth provider is required")
    }

    if (!appOAuthProviders.includes(credientials.provider as ProviderType)) {
        throw new Error("Available providers are: " + appOAuthProviders.join(", "))
    }

    
    const supabase = await createClient()
    
    const { provider, options: { redirectTo = `${process.env.APP_URL!}/auth/callback`, ...rest } = {} } = credientials;

    const {data, error} = await supabase.auth.signInWithOAuth({
        provider,
        options:{
            redirectTo,
            ...rest
        },
    })

    if(error){
        throw error
    }

    if(data.url){
        revalidatePath('/', 'layout')
        redirect(data.url)
    }

    throw new Error("Internal server error")
}