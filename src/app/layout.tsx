import type { Metadata } from "next";
import "./globals.css";
import { Widget } from "./widget";

export const metadata: Metadata = {
  title: "EaseAccess 24 Accessibility Widget",
  description: "The EaseAccess 24 Accessibility Widget is a tool that helps users with disabilities navigate and interact with websites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased h-screen w-screen`}
      >
        <Widget />
        {children}
      </body>
    </html>
  );
}
