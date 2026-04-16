import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminLayout from "./components/layout/AdminLayout"
import PagesList from "./modules/pages/PagesList"
import Login from "./modules/auth/Login"
import ProtectedRoute from "./routes/ProtectedRoute"
import PageEditor from "./modules/pages/PageEditor"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<div>Dashboard</div>} />
                  <Route path="/pages" element={<PagesList />} />
                  <Route path="/pages/new" element={<PageEditor />} />
                  <Route path="/pages/edit/:id" element={<PageEditor />} />
                  <Route path="/pages/edit/:id" element={<PageEditor />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App