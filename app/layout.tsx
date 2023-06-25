import Modal from "./components/modals/Modal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Modal actionLebel="Submit" title="Hello world" isOpen />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
