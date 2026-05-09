import { Route } from "react-router-dom"

import UsersList from "../modules/users/UsersList"
import CreateUser from "../modules/users/CreateUser"
import EditUser from "../modules/users/EditUser"

export const usersRoutes = (
  <>
    <Route
      path="/users"
      element={<UsersList />}
    />

    <Route
      path="/users/new"
      element={<CreateUser />}
    />

    <Route
      path="/users/edit/:id"
      element={<EditUser />}
    />
  </>
)