import ToolForm from "./ToolForm";
import { createTool }
from "./service/tool.service";

import { useNavigate }
from "react-router-dom";

export default function CreateTool() {

  const navigate =
    useNavigate();

  const handleCreate =
    async (
      formData: FormData
    ) => {

      await createTool(
        formData
      );

      navigate("/tools");
    };

  return (
    <ToolForm
      onSubmit={
        handleCreate
      }
    />
  );
}