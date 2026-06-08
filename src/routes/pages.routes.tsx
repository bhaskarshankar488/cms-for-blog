import { Route } from "react-router-dom"
import PagesList from "../modules/pages/PagesList"
import PageCreate from "../modules/pages/PageCreate";
import PageEdit from "../modules/pages/PageEdit";
import PreviewPage from "../modules/pages/PreviewPage"

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