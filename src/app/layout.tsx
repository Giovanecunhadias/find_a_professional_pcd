import type React from "react"
import Nav from "@/components/ui/Nav" // Ajuste o caminho conforme necessário
import { Inter } from "next/font/google" // Exemplo de fonte
import "./globals.css"
import { headers } from "next/headers"

const inter = Inter({ subsets: ["latin"] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Obter o pathname atual usando headers de forma assíncrona

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        
        <main>{children}</main>
      </body>
    </html>
  )
}

