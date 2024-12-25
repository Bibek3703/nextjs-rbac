import { appOAuthProviders } from "@/app/constants";

export type SvgProps = {
    size?: number,
    width?: number,
    height?: number,
}



export type ProviderType = typeof appOAuthProviders[number];