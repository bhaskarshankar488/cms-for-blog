import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { getMe } from "../api/auth.api"

export default function ProtectedRoute({ children }: any) {
  const [loading, setLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    getMe()
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p>Checking authentication...</p>
  }

  if (!isAuth) {
    return <Navigate to="/login" />
  }

  return children
}