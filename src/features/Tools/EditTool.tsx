import ToolForm from "./ToolForm";
import ToolContentForm from "./content/ToolContentForm";

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
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Edit Tool
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Update tool information and content.
        </p>
      </div>
      <ToolForm
        initialData={tool}
        toolImageUrl={tool?.images?.tool?.url}
        heroImageUrl={tool?.images?.hero?.url}
        faqImageUrl={tool?.images?.faq?.url}
        onSubmit={handleUpdate}
      />

      <ToolContentForm
        toolId={id}
      />
    </div>
  );
}
