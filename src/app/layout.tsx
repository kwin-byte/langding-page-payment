import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Landing Payment — USD - KHR - KHQR",
  description: "Nạp và rút tiền qua USD - KHR - KHQR",
  icons: {
    icon: "/Logo.png",
    apple: "/Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
      style={
        {
          "--font-orbitron": '"Orbitron", system-ui, sans-serif',
          "--font-rajdhani": '"Rajdhani", system-ui, sans-serif',
        } as React.CSSProperties
      }
    >
      <body className="h-dvh min-h-dvh overflow-hidden font-body">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
