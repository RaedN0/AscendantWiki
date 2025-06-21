import ThemeProviderWrapper from "@/app/components/ThemeProvider";
import Navbar from "@/app/components/navbar/Navbar";
import {RoleProvider} from "@/app/RoleContext";
import { Auth0Provider } from '@auth0/nextjs-auth0';

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
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                margin: 0,
                padding: 0,
            }}
        >
        <Auth0Provider>
            <ThemeProviderWrapper>
                <RoleProvider>
                <Navbar
                    style={{
                        flex: "0 0 auto",
                    }}
                />

                <main
                    style={{
                        flex: "1 1 auto",
                        overflow: "auto",
                        alignSelf: 'center'
                    }}
                >
                    {children}
                </main>
                </RoleProvider>
            </ThemeProviderWrapper>
        </Auth0Provider>
        </body>
        </html>
    );
}
