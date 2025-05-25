// app/layout.tsx
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css"; // Your global styles
import SessionProviderWrapper from "@/components/providers/SessionProviderWrapper"; // Adjust path
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TweetForge", // Your app name
    description: "Twitter Automation Platform",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Toaster position="top-center" />
        <SessionProviderWrapper>
            {/* Your Navbar can go here if it needs session data, or inside individual page layouts */}
            {children}
        </SessionProviderWrapper>
        </body>
        </html>
    );
}