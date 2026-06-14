import { Route } from "react-router-dom"

import ToolsListold from "../modules/tools/ToolsList"
import CreateToolold from "../modules/tools/CreateTool"
import EditToolold from "../modules/tools/EditTool"

import ToolsListtest from "../features/Tools/ToolsList"
import CreateTooltest from "../features/Tools/CreateTool"
import EditTooltest from "../features/Tools/EditTool"

export const toolsRoutes = (
  <>
    <Route path="/tools" element={<ToolsListtest />} />

    <Route path="/tools/new" element={<CreateTooltest />} />

    <Route path="/tools/edit/:id" element={<EditTooltest />} />

    <Route path="/toolsold" element={<ToolsListold />} />

    <Route path="/tools/newold" element={<CreateToolold />} />

    <Route path="/toolsold/edit/:id" element={<EditToolold />} />
  </>
)