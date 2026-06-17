import { FormSection } from "./FormFields";
import { FAQEditor } from "./ListEditors";

import type { FAQ } from "../types/toolContent.types";

interface Props {
  value: FAQ[];
  onChange: (value: FAQ[]) => void;
}

export default function FAQSection({
  value,
  onChange,
}: Props) {
  return (
    <FormSection title="FAQs">
      <FAQEditor
        items={value}
        onChange={onChange}
      />
    </FormSection>
  );
}
