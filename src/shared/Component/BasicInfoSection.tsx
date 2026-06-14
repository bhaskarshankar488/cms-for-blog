import { generateSlug } from "../../shared/utils/slug";

interface Props {
  form: any;
  setForm: any;
  setSlugTouched: (value: boolean) => void;
  entityName: string;
}

export default function BasicInfoFields({
  form,
  setForm,
  setSlugTouched,
  entityName,
}: Props) {
  return (
    <>
      <input
        name="title"
        placeholder={`${entityName} Title`}
        className="w-full p-2 sm:p-3 border rounded"
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,
            title: e.target.value,
          })
        }
      />

      <input
        name="slug"
        placeholder={`${entityName} Slug`}
        className="w-full p-2 sm:p-3 border rounded"
        value={form.slug}
        onChange={(e) => {
          setSlugTouched(true);

          setForm({
            ...form,
            slug: generateSlug(e.target.value),
          });
        }}
      />

      <input
        name="description"
        placeholder={`${entityName} Description`}
        className="w-full p-2 sm:p-3 border rounded"
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
      />
    </>
  );
}