export const mapAlternativeForEdit = (
  data: any
) => {
  return {
    ...data,

    tools: data.tools.map(
      (tool: any) => ({
        toolId:
          tool.toolId._id,

        toolName:
          tool.toolId.name,

        brand:
          tool.toolId.brand,

        customDescription:
          tool.customDescription,

        position:
          tool.position,
      })
    ),
  };
};