import { Route } from "react-router-dom"

import ToolsList from "../modules/tools/ToolsList"
import CreateTool from "../modules/tools/CreateTool"
import EditTool from "../modules/tools/EditTool"

export const toolsRoutes = (
  <>
    <Route path="/tools" element={<ToolsList />} />

    <Route path="/tools/new" element={<CreateTool />} />

    <Route path="/tools/edit/:id" element={<EditTool />} />
  </>
)