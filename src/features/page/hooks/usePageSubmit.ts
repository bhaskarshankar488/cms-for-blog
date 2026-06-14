import axios from "../../../api/axios"

export async function submitPage({
  isEdit,
  id,
  form,
  content,
  status,
  catImageFile,
}: any) {

  const formData =
    new FormData()

  formData.append(
    "title",
    form.title
  )

  formData.append(
    "slug",
    form.slug
  )

  formData.append(
    "pageDescription",
    form.pageDescription
  )

  formData.append(
    "categoryDescription",
    form.categoryDescription
  )

  formData.append(
    "categoryId",
    form.categoryId
  )

  formData.append(
    "meta",
    JSON.stringify(
      form.meta
    )
  )

  formData.append(
    "tools",
    JSON.stringify(
      form.tools.map(
        (t: any) => ({
          toolId:
            t.toolId,

          customDescription:
            t.customDescription,
        })
      )
    )
  )

  formData.append(
    "faq",
    JSON.stringify(
      form.faq
    )
  )

  formData.append(
    "content",
    content
  )

  formData.append(
    "status",
    status
  )

  if (catImageFile) {

    formData.append(
      "catImage",
      catImageFile
    )

  } else if (
    form.catImage?.url
  ) {

    formData.append(
      "catImage",
      JSON.stringify(
        form.catImage
      )
    )
  }

  if (isEdit) {

    return axios.put(
      `/pages/${id}`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    )
  }

  return axios.post(
    "/pages",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  )
}