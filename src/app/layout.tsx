import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "DesiDesign · Diwali Studio", description: "Create locally resonant Diwali marketing artwork." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }