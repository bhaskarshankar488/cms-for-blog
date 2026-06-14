interface Category {
  _id: string
  name: string
}

interface CategorySectionProps {
  value: string
  categories: Category[]
  onChange: (categoryId: string) => void
  label?: string
  placeholder?: string
  disabled?: boolean
}

export default function CategorySection({
  value,
  categories,
  onChange,
  label = "Category",
  placeholder = "Select Category",
  disabled = false,
}: CategorySectionProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        {label}
      </label>

      <select
        className="w-full p-2 sm:p-3 border rounded text-sm sm:text-base"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">
          {placeholder}
        </option>

        {categories.map((category) => (
          <option
            key={category._id}
            value={category._id}
          >
            {category.name}
          </option>
        ))}
      </select>
    </div>
  )
}