import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminLayout from "./components/layout/AdminLayout"
import PagesList from "./modules/pages/PagesList"
import Login from "./modules/auth/Login"
import ProtectedRoute from "./routes/ProtectedRoute"
import PageEditor from "./modules/pages/PageEditor"
import ToolsList from "./modules/tools/ToolsList"
import CreateTool from "./modules/tools/CreateTool"
import EditTool from "./modules/tools/EditTool"
import PreviewPage from "./modules/pages/PreviewPage"
import CategoriesList from "./modules/categories/CategoriesList"
import CreateCategory from "./modules/categories/CreateCategory"
import EditCategory from "./modules/categories/EditCategory"

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
                  <Route path="/tools" element={<ToolsList />} />
                  <Route path="/tools/new" element={<CreateTool />} />
                  <Route path="/tools/edit/:id" element={<EditTool />} />
                  <Route path="/preview/:slug" element={<PreviewPage />} />
                  <Route path="/categories" element={<CategoriesList />} />
                  <Route path="/categories/new" element={<CreateCategory />} />
                  <Route path="/categories/edit/:id" element={<EditCategory />} />
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