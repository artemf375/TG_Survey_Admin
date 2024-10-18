import type { Metadata } from "next";
import "@/public/styles/globals.css";
import Footer from "@/components/reusable/main/footer";

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
          {children}
          <Footer />
        </body>
      </html>
  );
}