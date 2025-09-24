import type React from "react"
import type { Metadata } from "next"
import { Encode_Sans_Expanded } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "./providers"
import { Suspense } from "react"
import "./globals.css"

const encodeSans = Encode_Sans_Expanded({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-encode-sans",
})

export const metadata: Metadata = {
  title: "FreshCart - Your Fresh Shopping Experience",
  description: "Complete e-commerce solution for fresh products and electronics",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${encodeSans.variable} antialiased`}>
        <Suspense fallback={null}>
          <Providers>{children}</Providers>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
