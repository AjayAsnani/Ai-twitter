import './globals.css'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import ConditionalRightSidebar from '@/components/ConditionalRightSidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Share Feed',
  description: 'Share and explore',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 min-h-screen border-x border-border">
            {children}
          </main>
          <ConditionalRightSidebar />
        </div>
      </body>
    </html>
  )
}