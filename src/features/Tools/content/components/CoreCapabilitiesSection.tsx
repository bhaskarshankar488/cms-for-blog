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
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            what is it
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Add the key WHAT IS that highlight what this tool can do.
          </p>
        </div>

        {/* Editor */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <IconTitleListEditor
            label="Capabilities"
            items={value}
            addLabel="+ Add Capability"
            createItem={() => ({
              title: "",
              icon: "",
            })}
            onChange={onChange}
          />
        </div>
      </div>
    </FormSection>
  );

}
