import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "SIGESA — Sistema de Acreditación UMSS",
  description:
    "Sistema de Gestión de la Evaluación y Seguimiento de la Acreditación – UMSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-50 font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
