import { FormSection } from "./FormFields";
import { IconTitleListEditor } from "./ListEditors";

import type { Feature } from "../types/toolContent.types";

interface Props {
  value: Feature[];
  onChange: (value: Feature[]) => void;
}

export default function FeaturesSection({
  value,
  onChange,
}: Props) {
  return (
    <FormSection title="Features">
      <IconTitleListEditor
        label="Features"
        items={value}
        addLabel="Add feature"
        createItem={() => ({
          icon: "",
          title: "",
        })}
        onChange={onChange}
      />
    </FormSection>
  );
}
