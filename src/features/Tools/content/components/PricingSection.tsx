import { FormSection, TextField } from "./FormFields";
import { PricingPlanEditor } from "./ListEditors";

import type { Pricing } from "../types/toolContent.types";

interface Props {
  value: Pricing;
  onChange: (value: Pricing) => void;
}

export default function PricingSection({
  value,
  onChange,
}: Props) {
  return (
    <FormSection title="Pricing">
      <div className="grid gap-3 md:grid-cols-2">
        <TextField
          label="Section title"
          value={value.sectionTitle}
          onChange={(sectionTitle) =>
            onChange({
              ...value,
              sectionTitle,
            })
          }
        />

        <TextField
          label="Annual discount"
          value={value.annualDiscount}
          onChange={(annualDiscount) =>
            onChange({
              ...value,
              annualDiscount,
            })
          }
        />
      </div>

      <TextField
        label="Section subtitle"
        value={value.sectionSubtitle}
        onChange={(sectionSubtitle) =>
          onChange({
            ...value,
            sectionSubtitle,
          })
        }
      />

      <PricingPlanEditor
        items={value.plans}
        onChange={(plans) =>
          onChange({
            ...value,
            plans,
          })
        }
      />
    </FormSection>
  );
}
