export const mapAlternativeForEdit = (
  data: any
) => ({
  ...data,

  toolId:
    data.toolId?._id ||
    "",

  mainToolName:
    data.toolId?.name ||
    "",

  mainToolBrand:
    data.toolId?.brand ||
    "",

  tools:
    (data.tools || []).map(
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

  faq:
    (data.faq || []).map(
      (faq: any) => ({
        question:
          faq.question,

        answer:
          faq.answer,
      })
    ),
});