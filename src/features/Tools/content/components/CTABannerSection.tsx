import { FormSection, TextAreaField, TextField } from "./FormFields";

import type { CTABanner } from "../types/toolContent.types";

interface Props {
  value: CTABanner;
  onChange: (value: CTABanner) => void;
}

export default function CTABannerSection({
  value,
  onChange,
}: Props) {
  return (
    <FormSection title="CTA Banner">
      <TextField
        label="Headline"
        value={value.headline}
        onChange={(headline) =>
          onChange({
            ...value,
            headline,
          })
        }
      />

      <TextAreaField
        label="Subtext"
        value={value.subtext}
        onChange={(subtext) =>
          onChange({
            ...value,
            subtext,
          })
        }
      />

      <div className="grid gap-3 md:grid-cols-2">
        <TextField
          label="Primary button text"
          value={value.primaryBtnText}
          onChange={(primaryBtnText) =>
            onChange({
              ...value,
              primaryBtnText,
            })
          }
        />

        <TextField
          label="Secondary button text"
          value={value.secondaryBtnText}
          onChange={(secondaryBtnText) =>
            onChange({
              ...value,
              secondaryBtnText,
            })
          }
        />

        <TextField
          label="Primary link"
          type="url"
          value={value.primaryLink}
          onChange={(primaryLink) =>
            onChange({
              ...value,
              primaryLink,
            })
          }
        />

        <TextField
          label="Secondary link"
          type="url"
          value={value.secondaryLink}
          onChange={(secondaryLink) =>
            onChange({
              ...value,
              secondaryLink,
            })
          }
        />
      </div>

      <TextField
        label="Bottom text"
        value={value.bottomText}
        onChange={(bottomText) =>
          onChange({
            ...value,
            bottomText,
          })
        }
      />
    </FormSection>
  );
}
