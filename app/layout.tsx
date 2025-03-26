import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const lexend = Lexend({
    variable: "--font-lexend",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Astra Bot",
    description: "Astra Bot is an AI-powered chatbot designed to assist with various tasks and provide information efficiently.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <head>
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/favicon-16x16.png"
                    />
                    <link rel="manifest" href="/site.webmanifest" />
                </head>
                <body className={`${lexend.variable} antialiased`}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
