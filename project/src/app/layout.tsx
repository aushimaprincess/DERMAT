import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Shell from "@/components/shell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AyurDerma STG — Ayurvedic Dermatology Clinical Reference",
  description:
    "Chapter-wise clinical reference for Ayurvedic physicians based on the Ministry of AYUSH Standard Treatment Guidelines on Management of Dermatological Disorders in Ayurveda System of Medicine (June 2026). Covers Dermatitis, Dermatophytosis, Psoriasis, Urticaria and Vitiligo.",
  alternates: { canonical: "https://ayurderma-stg.vercel.app" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={inter.className}>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
