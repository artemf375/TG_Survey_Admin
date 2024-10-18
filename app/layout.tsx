import type { Metadata } from "next";
import "@/public/styles/globals.css";
import Footer from "@/components/reusable/main/footer";
import AuthSessionProvider from "./providers/SessionProvider";
import { getServerSession } from "next-auth";
import { authConfig } from "./api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "TG Survey Admin UI",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authConfig);

  return (
    <html lang="en">
      <body>
        <AuthSessionProvider session={session}>
          {children}
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
