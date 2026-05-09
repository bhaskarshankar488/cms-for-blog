import { Route } from "react-router-dom"

import CategoriesList from "../modules/categories/CategoriesList"
import CreateCategory from "../modules/categories/CreateCategory"
import EditCategory from "../modules/categories/EditCategory"

export const categoriesRoutes = (
  <>
    <Route path="/categories" element={<CategoriesList />} />

    <Route
      path="/categories/new"
      element={<CreateCategory />}
    />

    <Route
      path="/categories/edit/:id"
      element={<EditCategory />}
    />
  </>
)