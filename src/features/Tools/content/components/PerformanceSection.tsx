import { FormSection, TextAreaField, TextField } from "./FormFields";
import { MetricEditor, SimpleListEditor } from "./ListEditors";

import type { PerformanceSection as PerformanceSectionType } from "../types/toolContent.types";

interface Props {
  value: PerformanceSectionType;
  onChange: (value: PerformanceSectionType) => void;
}

export default function PerformanceSection({
  value,
  onChange,
}: Props) {
  return (
    <FormSection title="Performance">
      <TextField
        label="Title"
        value={value.title}
        onChange={(title) =>
          onChange({
            ...value,
            title,
          })
        }
      />

      <TextAreaField
        label="Description"
        value={value.description}
        onChange={(description) =>
          onChange({
            ...value,
            description,
          })
        }
      />

      <SimpleListEditor
        label="Security features"
        items={value.securityFeatures}
        addLabel="Add security feature"
        onChange={(securityFeatures) =>
          onChange({
            ...value,
            securityFeatures,
          })
        }
      />

      <MetricEditor
        items={value.metrics}
        onChange={(metrics) =>
          onChange({
            ...value,
            metrics,
          })
        }
      />
    </FormSection>
  );
}
