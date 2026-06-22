import { Route } from "react-router-dom"

import CreateAlternative from "../features/ToolAlternative/pages/CreateAlternative"
import EditAlternative from "../features/ToolAlternative/pages/EditAlternative"
import AlternativeList from "../features/ToolAlternative/pages/AlternativeList"


export const ToolAlternative = (
  <>
   <Route path="/alternatives/create" element={<CreateAlternative />}/>
   <Route path="/alternatives/edit/:id" element={<EditAlternative />}/>
   <Route path="/AlternativeList" element={<AlternativeList/>}/>
  </>
)