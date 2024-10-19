import type { Metadata } from "next";
import "@/public/styles/globals.css";
import Footer from "@/components/main/footer/footer";
import AdminHeader from "@/components/admin/header/header";
import { Flex } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "TG Survey Admin UI",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Flex
          maxH={'100vh'}
          flexDir={'column'}
        >
          <AdminHeader />
          {children}
          <Footer />
        </Flex>
      </body>
    </html>
  );
}