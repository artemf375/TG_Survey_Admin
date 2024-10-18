import type { Metadata } from "next";
import "@/public/styles/globals.css";

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
      </body>
    </html>
  );
}
