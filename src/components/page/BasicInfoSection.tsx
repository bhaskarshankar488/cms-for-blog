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
            e.target.value
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, "")
              .replace(/\s+/g, "-")
              .replace(/-+/g, "-")

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