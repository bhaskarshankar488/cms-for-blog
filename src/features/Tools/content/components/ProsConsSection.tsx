import { FormSection } from "./FormFields";
import { SimpleListEditor } from "./ListEditors";

import type { ProsCons } from "../types/toolContent.types";

interface Props {
  value: ProsCons;
  onChange: (value: ProsCons) => void;
}

export default function ProsConsSection({
  value,
  onChange,
}: Props) {
  return (
    <FormSection title="Pros & Cons">
      <SimpleListEditor
        label="Pros"
        items={value.pros}
        addLabel="Add pro"
        onChange={(pros) =>
          onChange({
            ...value,
            pros,
          })
        }
      />

      <SimpleListEditor
        label="Cons"
        items={value.cons}
        addLabel="Add con"
        onChange={(cons) =>
          onChange({
            ...value,
            cons,
          })
        }
      />
    </FormSection>
  );
}
