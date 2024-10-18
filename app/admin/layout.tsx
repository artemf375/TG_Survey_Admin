import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "TG Survey Admin UI",
    description: "",
};

type RootLayoutProps = {
    children: React.ReactNode;
};

export default function RootLayout({
    children,
}: RootLayoutProps) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}