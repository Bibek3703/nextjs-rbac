"use client";

import React, { Fragment, useEffect, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";

type BreadcrumbItem = {
    label: string;
    href: string;
};

export default function AppTopBar() {
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
    const pathname = usePathname();

    useEffect(() => {
        const createBreadcrumbs = () => {
            const pathnameArray = pathname.split("/").filter((segment) =>
                segment !== ""
            );
            const breadcrumbList = pathnameArray.map((segment, index) => ({
                label: decodeURIComponent(segment),
                href: `/${pathnameArray.slice(0, index + 1).join("/")}`,
            }));
            setBreadcrumbs(breadcrumbList);
        };

        createBreadcrumbs();
    }, [pathname]);

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                {breadcrumbs.length > 1 && (
                    <Separator
                        orientation="vertical"
                        className="mr-2 h-4"
                    />
                )}
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbs.map((breadcrumb, index) => (
                            <Fragment key={index}>
                                {index > 0 && (
                                    <BreadcrumbSeparator
                                        key={index +
                                            breadcrumb.href}
                                        className="hidden md:block capitalize"
                                    />
                                )}
                                <BreadcrumbItem
                                    key={breadcrumb.href}
                                >
                                    {breadcrumb.href
                                        ? (
                                            <BreadcrumbLink
                                                href={breadcrumb
                                                    .href}
                                                className="capitalize"
                                            >
                                                {breadcrumb.label}
                                            </BreadcrumbLink>
                                        )
                                        : (
                                            <BreadcrumbPage className="capitalize">
                                                {breadcrumb.label}
                                            </BreadcrumbPage>
                                        )}
                                </BreadcrumbItem>
                            </Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
}
