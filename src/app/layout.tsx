import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Layout/Header";
import { SimulationProvider } from "@/context/SimulationContext";

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
      <body className="min-h-screen bg-slate-50 font-sans text-slate-950 flex flex-col">
        <SimulationProvider>
          <Header />
          <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </main>
        </SimulationProvider>
      </body>
    </html>
  );
}
