import { Route } from "react-router-dom"

import PagesList from "../modules/pages/PagesList"
import PageEditor from "../modules/pages/PageEditor"
import PreviewPage from "../modules/pages/PreviewPage"

export const pagesRoutes = (
  <>
    <Route path="/pages" element={<PagesList />} />

    <Route path="/pages/new" element={<PageEditor />} />

    <Route path="/pages/edit/:id" element={<PageEditor />} />

    <Route path="/preview/:slug" element={<PreviewPage />} />
  </>
)