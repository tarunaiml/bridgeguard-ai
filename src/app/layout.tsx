import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Layout/Header";
import { SimulationProvider } from "@/context/SimulationContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BridgeGuard ML",
  description: "Explainable Machine Learning for Bridge Structural Health Monitoring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F5F7FA] text-[#111827] min-h-screen flex flex-col`}>
        <SimulationProvider>
          <Header />
          <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </SimulationProvider>
      </body>
    </html>
  );
}
