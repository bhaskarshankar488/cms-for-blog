import { generateSlug, } from "../../../shared/utils/slug";

interface Props {
  form: any
  setForm: any
  setSlugTouched: any
}

export default function BasicInfoSection({
  form,
  setForm,
  setSlugTouched,
}: Props) {

  return (
    <>
      {/* PAGE TITLE */}
      <input
        name="title"
        placeholder="Page Title"
        className="w-full p-2 sm:p-3 border rounded"
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,
            title: e.target.value,
          })
        }
      />

      {/* SLUG */}
      <input
        name="slug"
        placeholder="Slug"
        className="w-full p-2 sm:p-3 border rounded"
        value={form.slug}
        onChange={(e) => {

          setSlugTouched(true)

          const value =
            generateSlug(
              e.target.value
            );

          setForm({
            ...form,
            slug: value,
          })
        }}
      />

      {/* DESCRIPTION */}
      <input
        placeholder="Page Description"
        className="w-full p-2 sm:p-3 border rounded"
        value={form.pageDescription}
        onChange={(e) =>
          setForm({
            ...form,
            pageDescription:
              e.target.value,
          })
        }
      />
    </>
  )
}