import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/*components*/
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

/*queryclientprovider*/
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Modern application for dynamic note creation",
  icons: {
    icon: "/notes-icon.svg",
  },
  openGraph: {
    title: "NoteHub",
    description: "Modern application for dynamic note creation",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "An icon of a note with a completed task, with the application name Notehub displayed next to it.",

      }
    ]
  }
};

export default function RootLayout({
  children, modal
}: Readonly<{
  children: React.ReactNode; modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
