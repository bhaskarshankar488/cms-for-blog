interface Props {
  form: any
  setForm: any
  categories: any[]
}

export default function CategorySection({
  form,
  setForm,
  categories,
}: Props) {
  return (
    <>
      {/* CATEGORY DESCRIPTION */}
      <textarea
        placeholder="Category Description"
        className="w-full p-3 border rounded"
        value={form.categoryDescription}
        onChange={(e) =>
          setForm({
            ...form,
            categoryDescription: e.target.value,
          })
        }
      />

      {/* CATEGORY */}
      <select
        className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
        value={form.categoryId}
        onChange={(e) =>
          setForm({
            ...form,
            categoryId: e.target.value,
          })
        }
      >
        <option value="">
          Select Category
        </option>

        {categories.map((cat) => (
          <option
            key={cat._id}
            value={cat._id}
          >
            {cat.name}
          </option>
        ))}
      </select>
    </>
  )
}