import ToolForm from "./ToolForm";

import {
  updateTool,
} from "./service/tool.service";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useTool,
} from "./hooks/useTool";

export default function EditTool() {

  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const {
    tool,
    loading,
  } = useTool(id);

  const handleUpdate =
    async (
      formData: FormData
    ) => {

      await updateTool(
        id!,
        formData
      );

      navigate("/tools");
    };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
 <ToolForm
  initialData={tool}
  toolImageUrl={tool?.images?.tool?.url}
  heroImageUrl={tool?.images?.hero?.url}
  faqImageUrl={tool?.images?.faq?.url}
  onSubmit={handleUpdate}
/>
  );
}