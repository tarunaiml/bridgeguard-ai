import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Layout/Header";
import { SimulationProvider } from "@/context/SimulationContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BridgeGuard AI | Prototype Dashboard",
  description: "AI-Powered Structural Health Monitoring for Bridge Prototypes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#070B14] text-slate-300 min-h-screen flex flex-col`}>
        <SimulationProvider>
          <Header />
          <main className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </SimulationProvider>
      </body>
    </html>
  );
}
