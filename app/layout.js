import "./globals.css";
import { Inter, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://haciogroup.org"),
  title: {
    default: "HaciGroup | Nonprofit Innovation",
    template: "%s | HaciGroup",
  },
  description:
    "Parent organization for NELA Ride and The Handy Hack — nonprofit tech for equity and sustainability.",
  openGraph: {
    title: "HaciGroup",
    description:
      "Building nonprofit platforms like NELA Ride and The Handy Hack to empower communities.",
    url: "https://haciogroup.org",
    siteName: "HaciGroup",
    images: ["/og-image.jpg"],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${mono.variable} font-sans antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
