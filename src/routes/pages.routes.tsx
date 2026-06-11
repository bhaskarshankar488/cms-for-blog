import { Route } from "react-router-dom"
import PagesList from "../features/page/PagesList"
import PageCreate from "../features/page/PageCreate";
import PageEdit from "../features/page/PageEdit";
import PreviewPage from "../features/page/PreviewPage"

export const pagesRoutes = (
  <>
    <Route path="/pages" element={<PagesList />} />

    <Route
      path="/pages/create"
      element={<PageCreate />}
    />

    <Route
      path="/pages/edit/:id"
      element={<PageEdit />}
    />

    <Route path="/preview/:slug" element={<PreviewPage />} />
  </>
)