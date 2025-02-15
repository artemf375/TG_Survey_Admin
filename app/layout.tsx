import type { Metadata } from "next";
import "@/public/styles/globals.css";
import Footer from "@/components/main/footer/footer";
import AuthSessionProvider from "./providers/SessionProvider";
import { getServerSession, Session } from "next-auth";
import authConfig from "./api/auth/[...nextauth]/authConfig";
import { ChakraProvider } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "TG Survey Admin UI",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authConfig) as Session;

  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <AuthSessionProvider session={session}>
            {children}
            <Footer />
          </AuthSessionProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}