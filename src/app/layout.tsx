import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import QueryProvider from "@/components/query-provider";
import { Toaster } from "@/components/ui/sonner";
import {
  getUserAppRole,
  getUserSession,
} from "./(auth)/_actions/getCurrentUser";

export const metadata: Metadata = {
  title: "Todo App",
  description: "Role based access control",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: { session } } = await getUserSession();

  const role = getUserAppRole(session?.access_token);
  return (
    <html lang="en" suppressHydrationWarning>
      {role && (
        <head>
          <title>{role}</title>
        </head>
      )}
      <body className="min-h-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthProvider>
              {children}
              <Toaster richColors />
              <SpeedInsights />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
