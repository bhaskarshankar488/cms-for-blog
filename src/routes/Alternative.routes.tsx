import { Route } from "react-router-dom"

import CreateAlternative from "../features/ToolAlternative/pages/CreateAlternative"

export const ToolAlternative = (
  <>
   <Route path="/alternatives/create" element={<CreateAlternative />}/>
  </>
)