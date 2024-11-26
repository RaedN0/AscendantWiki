import localFont from "next/font/local";
import "./globals.css";
import ThemeProviderWrapper from "@/app/components/ThemeProvider";
import Navbar from "@/app/components/navbar/Navbar";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata = {
    title: "Ascendant Wiki",
    description: "Wiki page for the game Ascendant",
};

export const viewport = {
    themeColor: 'black',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <ThemeProviderWrapper>
            <Navbar />
            {children}
        </ThemeProviderWrapper>
        </body>
        </html>
    );
}
