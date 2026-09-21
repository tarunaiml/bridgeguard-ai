import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Layout/Sidebar";
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
      <body className={`${inter.className} bg-[#050810] text-gray-300 min-h-screen flex`}>
        <SimulationProvider>
          <Sidebar />
          <div className="flex-1 flex flex-col max-h-screen overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
              {children}
            </main>
          </div>
        </SimulationProvider>
      </body>
    </html>
  );
}
