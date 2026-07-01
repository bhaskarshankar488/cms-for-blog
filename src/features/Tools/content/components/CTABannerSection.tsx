import {
  FormSection,
  TextAreaField,
  TextField,
} from "./FormFields";

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
    <FormSection title="Call To Action (CTA) Banner">
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-base font-semibold text-gray-900">
            CTA Banner
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Configure the call-to-action banner displayed at the bottom of the
            tool page.
          </p>
        </div>

        {/* Banner Content */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="space-y-5">
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
              rows={4}
              value={value.subtext}
              onChange={(subtext) =>
                onChange({
                  ...value,
                  subtext,
                })
              }
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h4 className="mb-5 text-sm font-semibold text-gray-900">
            Button Configuration
          </h4>

          <div className="grid gap-5 md:grid-cols-2">
            <TextField
              label="Primary Button Text"
              value={value.primaryBtnText}
              onChange={(primaryBtnText) =>
                onChange({
                  ...value,
                  primaryBtnText,
                })
              }
            />

            <TextField
              label="Secondary Button Text"
              value={value.secondaryBtnText}
              onChange={(secondaryBtnText) =>
                onChange({
                  ...value,
                  secondaryBtnText,
                })
              }
            />

            <TextField
              label="Primary Button Link"
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
              label="Secondary Button Link"
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
        </div>

        {/* Footer */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <TextField
            label="Bottom Text"
            value={value.bottomText}
            onChange={(bottomText) =>
              onChange({
                ...value,
                bottomText,
              })
            }
          />
        </div>
      </div>
    </FormSection>
  );
}