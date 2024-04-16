import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Promptopia",
    template: "%s | Promptopia",
  },
  description: "AI Powered prompts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            <div className="mt-[50px]">{children}</div>
          </main>
        </Provider>
      </body>
    </html>
  );
}
