"use client"
import "@src/app/globals.css"
import { Inter } from "next/font/google"
import { Provider } from "react-redux"
import { store } from "@src/lib/store"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  )
}

