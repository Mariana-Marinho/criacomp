import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Assistente Virtual - Coordenação de Ensino CIn/UFPE',
  description: 'Assistente para informações acadêmicas do Centro de Informática',
  themeColor: '#dc2626',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
        >
          <main className="relative flex min-h-screen flex-col">
            {children}
            <footer className="py-4 text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} Centro de Informática - UFPE
            </footer>
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}