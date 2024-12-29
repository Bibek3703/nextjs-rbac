"use client";

import { createClient } from "@/utils/supabase/client";
import {
    AuthChangeEvent,
    Session,
    Subscription,
    User,
} from "@supabase/supabase-js";
import { usePathname, useRouter } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

interface AuthContext {
    session: Session | null;
    user: User & { appRole: string } | null;
}

const AuthContext = createContext<AuthContext>({
    session: null,
    user: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userLoaded, setUserLoaded] = useState(false);
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User & { appRole: string } | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    const handleOnAuthChange = (
        event: AuthChangeEvent,
        session: Session | null,
    ) => {
        let currentUser = session?.user as User & { appRole: string };
        if (session && currentUser) {
            const jwt = jwtDecode(session.access_token) as JwtPayload & {
                user_role: string;
            };
            if (jwt?.user_role) {
                currentUser.appRole = jwt.user_role;
            }
        }
        setUser(currentUser ?? null);
        setUserLoaded(!!currentUser);
        setSession(session);
        if (event === "INITIAL_SESSION") {
            // handle initial session
        } else if (event === "SIGNED_IN") {
            // handle sign in event
            if (pathname === "/sign-in") {
                router.push("/admin");
            }
        } else if (event === "SIGNED_OUT") {
            // handle sign out event
            if (pathname.startsWith("/admin")) {
                router.push("/sign-in");
            }
        } else if (event === "PASSWORD_RECOVERY") {
            // handle password recovery event
        } else if (event === "TOKEN_REFRESHED") {
            // handle token refreshed event
        } else if (event === "USER_UPDATED") {
            // handle user updated event
        }
    };

    useEffect(() => {
        let subscription: Subscription;
        async function onAuthInit() {
            // call unsubscribe to remove the callback
            const supabase = await createClient();
            const { data } = supabase.auth.onAuthStateChange(
                (event, session) => {
                    // console.log(event, session);
                    handleOnAuthChange(event, session);
                },
            );
            subscription = data.subscription;
        }
        onAuthInit();
        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, []);

    return (
        <AuthContext.Provider value={{ session, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
