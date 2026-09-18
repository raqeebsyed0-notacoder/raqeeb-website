import { Navbar, Footer } from '../components/Layout'

interface PageLayoutProps {
  children: React.ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative z-10 flex min-h-screen flex-col px-5 sm:px-6 md:px-10 lg:px-14">
        <Navbar />
        <main className="flex-1 py-12">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
