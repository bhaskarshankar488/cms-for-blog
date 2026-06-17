import { FormSection } from "./FormFields";
import { IconTitleListEditor } from "./ListEditors";

import type { CoreCapability } from "../types/toolContent.types";

interface Props {
  value: CoreCapability[];
  onChange: (value: CoreCapability[]) => void;
}

export default function CoreCapabilitiesSection({
  value,
  onChange,
}: Props) {
  return (
    <FormSection title="Core Capabilities">
      <IconTitleListEditor
        label="Capabilities"
        items={value}
        addLabel="Add capability"
        createItem={() => ({
          title: "",
          icon: "",
        })}
        onChange={onChange}
      />
    </FormSection>
  );
}
