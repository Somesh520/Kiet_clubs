import { Bebas_Neue } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/kiet-theme.scss";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

export const metadata = {
  metadataBase: new URL("https://www.kiet.edu"),
  title: {
    default: "KIET Clubs & Events",
    template: "%s | KIET Clubs & Events",
  },
  description: "Stay updated with the latest student-led clubs, cultural events, technical societies, and extracurricular activities at KIET Group of Institutions.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={bebasNeue.variable}>
      <body>{children}</body>
    </html>
  );
}

