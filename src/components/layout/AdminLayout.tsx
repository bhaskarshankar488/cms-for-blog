import type { ReactNode } from "react"
import { Link } from "react-router-dom"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">CMS</h2>

        <nav className="space-y-2">
          <Link to="/" className="block">Dashboard</Link>
          <Link to="/pages" className="block">Pages</Link>
          <Link to="/tools" className="block">tools</Link>
          <Link to="/categories" className="block">categories</Link>

        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">
        {children}
      </div>
    </div>
  )
}