import { useState } from "react"
import axios from "../../api/axios"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      })

      if (res.data.success) {

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.data)
        )

        navigate("/")
      }

    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">

      <form
        onSubmit={handleLogin}
        className="bg-white p-5 sm:p-6 rounded-xl shadow w-full max-w-sm"
      >
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-left">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded text-sm sm:text-base"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded text-sm sm:text-base"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white p-2 rounded text-sm sm:text-base">
          Login
        </button>
      </form>

    </div>
  )
}