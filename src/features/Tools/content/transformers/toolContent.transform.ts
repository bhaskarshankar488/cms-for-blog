// transformers/toolContent.transform.ts

export const transformToolContent = (
  data: any
) => {
  return {
    ...data,

    alternativeTools:
      data.alternativeTools?.map(
        (item: any) => ({
          alternativeId:
            item.alternativeId?._id ||
            item.alternativeId,

          position: item.position,

          isSponsored:
            item.isSponsored,
        })
      ) || [],

    alternativeToolsData:
      data.alternativeTools?.map(
        (item: any) => ({
          id:
            item.alternativeId?._id,

          name:
            item.alternativeId?.name,

          slug:
            item.alternativeId?.slug,

          brand:
            item.alternativeId?.brand,

          image:
            item.alternativeId?.images
              ?.tool?.url || "",
        })
      ) || [],
  };
};