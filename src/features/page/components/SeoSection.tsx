interface Props {
  form: any
  setForm: any
}

export default function SeoSection({
  form,
  setForm,
}: Props) {
  return (
    <>
      {/* META TITLE */}
      <input
        placeholder="Meta Title"
        className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
        value={form.meta.title}
        onChange={(e) =>
          setForm({
            ...form,
            meta: {
              ...form.meta,
              title: e.target.value,
            },
          })
        }
      />

      {/* META DESCRIPTION */}
      <textarea
        placeholder="Meta Description"
        className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
        value={form.meta.description}
        onChange={(e) =>
          setForm({
            ...form,
            meta: {
              ...form.meta,
              description: e.target.value,
            },
          })
        }
      />
    </>
  )
}