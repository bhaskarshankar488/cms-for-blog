import { useState } from "react";

import BestForSection from "./components/BestForSection";
import CoreCapabilitiesSection from "./components/CoreCapabilitiesSection";
import CTABannerSection from "./components/CTABannerSection";
import EngineAndValueSection from "./components/EngineAndValueSection";
import FAQSection from "./components/FAQSection";
import FeaturesSection from "./components/FeaturesSection";
import HeroSection from "./components/HeroSection";
import LatestBlogsSection from "./components/LatestBlogsSection";
import PerformanceSection from "./components/PerformanceSection";
import PricingSection from "./components/PricingSection";
import ProsConsSection from "./components/ProsConsSection";
import UnderTheHoodSection from "./components/UnderTheHoodSection";
import { useToolContent } from "./hooks/useToolContent";
import { updateToolContent } from "./service/toolContent.service";
import { toolContentSchema } from "./validation/toolContent.schema";

interface Props {
  toolId?: string;
}

export default function ToolContentForm({
  toolId,
}: Props) {
  const {
    content,
    setContent,
    loading,
    error,
  } = useToolContent(toolId);

  const [saving, setSaving] =
    useState(false);

  const handleSave =
    async () => {
      if (!toolId) {
        alert("Tool id is required");
        return;
      }

      const payload = {
        ...content,
        toolId,
      };

      delete payload._id;

      const result =
        toolContentSchema.safeParse(payload);

      if (!result.success) {
        alert(result.error.issues[0].message);
        return;
      }

      try {
        setSaving(true);

        await updateToolContent(
          toolId,
          result.data
        );

        alert("Tool content updated successfully!");
      } catch (saveError) {
        console.error(saveError);
        alert("Unable to update tool content");
      } finally {
        setSaving(false);
      }
    };

  if (loading) {
    return <p>Loading tool content...</p>;
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="border-t pt-6">
        <h2 className="text-xl font-semibold">
          Tool Content
        </h2>

        {error ? (
          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        ) : null}
      </div>

      <HeroSection
        value={content.hero}
        onChange={(hero) =>
          setContent((prev) => ({
            ...prev,
            hero,
          }))
        }
      />

      <CoreCapabilitiesSection
        value={content.coreCapabilities}
        onChange={(coreCapabilities) =>
          setContent((prev) => ({
            ...prev,
            coreCapabilities,
          }))
        }
      />

      <ProsConsSection
        value={content.prosCons}
        onChange={(prosCons) =>
          setContent((prev) => ({
            ...prev,
            prosCons,
          }))
        }
      />

      <LatestBlogsSection
        value={content.latestBlogs}
        onChange={(latestBlogs) =>
          setContent((prev) => ({
            ...prev,
            latestBlogs,
          }))
        }
      />

      <EngineAndValueSection
        value={content.engineAndValue}
        onChange={(engineAndValue) =>
          setContent((prev) => ({
            ...prev,
            engineAndValue,
          }))
        }
      />

      <UnderTheHoodSection
        value={content.underTheHood}
        onChange={(underTheHood) =>
          setContent((prev) => ({
            ...prev,
            underTheHood,
          }))
        }
      />

      <FeaturesSection
        value={content.features}
        onChange={(features) =>
          setContent((prev) => ({
            ...prev,
            features,
          }))
        }
      />

      <BestForSection
        value={content.bestFor}
        onChange={(bestFor) =>
          setContent((prev) => ({
            ...prev,
            bestFor,
          }))
        }
      />

      <PerformanceSection
        value={content.performanceSection}
        onChange={(performanceSection) =>
          setContent((prev) => ({
            ...prev,
            performanceSection,
          }))
        }
      />

      <PricingSection
        value={content.pricing}
        onChange={(pricing) =>
          setContent((prev) => ({
            ...prev,
            pricing,
          }))
        }
      />

      <FAQSection
        value={content.faqs}
        onChange={(faqs) =>
          setContent((prev) => ({
            ...prev,
            faqs,
          }))
        }
      />

      <CTABannerSection
        value={content.ctaBanner}
        onChange={(ctaBanner) =>
          setContent((prev) => ({
            ...prev,
            ctaBanner,
          }))
        }
      />

      <button
        type="button"
        disabled={saving}
        onClick={handleSave}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Tool Content"}
      </button>
    </div>
  );
}
