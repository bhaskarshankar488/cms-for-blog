import type { ReactNode } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "../../api/axios"

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const res = await axios.post("/auth/logout")

      if (res.data.success) {
        navigate("/login")
      }
    } catch (err: any) {
      console.error(
        "LOGOUT ERROR:",
        err.response?.data || err
      )
    }
  }

  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4 flex flex-col justify-between">
        
        {/* Top */}
        <div>
          <h2 className="text-xl font-bold mb-6">CMS</h2>

          <nav className="space-y-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Dashboard
            </Link>

            <Link
              to="/pages"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Pages
            </Link>

            <Link
              to="/tools"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Tools
            </Link>

            <Link
              to="/categories"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Categories
            </Link>
          </nav>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-6 bg-gray-50">
        {children}
      </div>
    </div>
  )
}