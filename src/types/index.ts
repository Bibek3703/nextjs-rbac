import { appOAuthProviders, todoStatuses } from "@/constants";

export type SvgProps = {
    size?: number;
    width?: number;
    height?: number;
};

export type ProviderType = typeof appOAuthProviders[number];
export type TodoStatusType = typeof todoStatuses[number];
