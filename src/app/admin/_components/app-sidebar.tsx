"use client";

import * as React from "react";
import {
    AudioWaveform,
    Command,
    GalleryVerticalEnd,
    Home,
    Notebook,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavItem, NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { useAuth } from "@/components/auth-provider";

// This is sample data.
const data = {
    teams: [
        {
            name: "Todo App",
            logo: GalleryVerticalEnd,
            plan: "Basic",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "/admin",
            icon: Home,
            roles: ["admin"],
        },
        {
            title: "Todos",
            url: "/admin/todos",
            icon: Notebook,
            roles: ["admin", "moderator"],
        },
        // {
        //     title: "Users",
        //     url: "/admin/users",
        //     icon: Users,
        //     roles: ["admin"],
        // },
        // {
        //     title: "Settings",
        //     url: "#",
        //     icon: Settings2,
        //     items: [
        //         {
        //             title: "General",
        //             url: "/admin/settings",
        //         },
        //         {
        //             title: "Team",
        //             url: "#",
        //         },
        //         {
        //             title: "Billing",
        //             url: "#",
        //         },
        //         {
        //             title: "Limits",
        //             url: "#",
        //         },
        //     ],
        // },
    ],
    // projects: [
    //     {
    //         name: "Design Engineering",
    //         url: "#",
    //         icon: Frame,
    //     },
    //     {
    //         name: "Sales & Marketing",
    //         url: "#",
    //         icon: PieChart,
    //     },
    //     {
    //         name: "Travel",
    //         url: "#",
    //         icon: Map,
    //     },
    // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher
                    teams={[{
                        name: "Todo App",
                        logo: GalleryVerticalEnd,
                        role: user.appRole,
                    }]}
                />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain as NavItem[]} />
                {/* <NavTodos projects={data.projects} /> */}
            </SidebarContent>
            <SidebarFooter>
                <NavUser
                    user={{
                        email: user?.email || "user@example.com",
                        name: user?.user_metadata?.name || "User name",
                        avatar: user?.user_metadata?.avatar_url ||
                            "/avatars/avatar.svg",
                    }}
                />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
