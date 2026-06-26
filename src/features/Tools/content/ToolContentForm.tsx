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
import { updateToolContent, createToolContent } from "./service/toolContent.service";
import { toolContentSchema } from "./validation/toolContent.schema";
import AlternativeToolsSection from "./components/AlternativeToolsSection";

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

  const hasContent = Boolean(content._id);

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

  const handleCreate = async () => {
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

      await createToolContent(
        result.data
      );

      alert(
        "Tool content created successfully!"
      );
    } catch (error) {
      console.error(error);
      alert(
        "Unable to create tool content"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading tool content...</p>;
  }

  return (
    <div className="mt-8 space-y-12">
      <div className="border-t pt-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Tool Content
        </h2>

        {error ? (
          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        ) : null}
      </div>

      <section className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 px-4 py-3 rounded-md">
          <h2 className="text-xl font-bold text-blue-700">
            Selelect Alernative Tool
          </h2>
        </div>
        <AlternativeToolsSection
          value={content.alternativeTools}
          initialTools={
            content.alternativeToolsData || []
          }
          onChange={(alternativeTools) =>
            setContent((prev) => ({
              ...prev,
              alternativeTools,
            }))
          }
        />

      </section>
      <section className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 px-4 py-3 rounded-md">
          <h2 className="text-xl font-bold text-blue-700">
            Hero Section
          </h2>
          
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
      </section>
      <section className="space-y-6">
        <div className="bg-green-50 border-l-4 border-green-500 px-4 py-3 rounded-md">
          <h2 className="text-xl font-bold text-green-700">
            Core Capabilities Section
          </h2>
        </div>
        <CoreCapabilitiesSection
          value={content.coreCapabilities}
          onChange={(coreCapabilities) =>
            setContent((prev) => ({
              ...prev,
              coreCapabilities,
            }))
          }
        />
      </section>

      <section className="space-y-6">
        <div className="bg-purple-50 border-l-4 border-purple-500 px-4 py-3 rounded-md">
          <h2 className="text-xl font-bold text-purple-700">
            Pros & Cons Section
          </h2>
        </div>
        <ProsConsSection
          value={content.prosCons}
          onChange={(prosCons) =>
            setContent((prev) => ({
              ...prev,
              prosCons,
            }))
          }
        />
      </section>

      <section className="space-y-6">
        <div className="bg-orange-50 border-l-4 border-orange-500 px-4 py-3 rounded-md">
          <h2 className="text-xl font-bold text-orange-700">
            Latest Blogs Section
          </h2>
        </div>
        <LatestBlogsSection
          value={content.latestBlogs}
          onChange={(latestBlogs) =>
            setContent((prev) => ({
              ...prev,
              latestBlogs,
            }))
          }
        />
      </section>

      <section className="space-y-6">
        <div className="bg-cyan-50 border-l-4 border-cyan-500 px-4 py-3 rounded-md">
          <h2 className="text-xl font-bold text-cyan-700">
            Engine & Value Section
          </h2>
        </div>
        <EngineAndValueSection
          value={content.engineAndValue}
          onChange={(engineAndValue) =>
            setContent((prev) => ({
              ...prev,
              engineAndValue,
            }))
          }
        />
      </section>

      <section className="space-y-6">
        <div className="bg-pink-50 border-l-4 border-pink-500 px-4 py-3 rounded-md">
          <h2 className="text-xl font-bold text-pink-700">
            Under The Hood Section
          </h2>
        </div>
        <UnderTheHoodSection
          value={content.underTheHood}
          onChange={(underTheHood) =>
            setContent((prev) => ({
              ...prev,
              underTheHood,
            }))
          }
        />
      </section>

      <section className="space-y-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 px-4 py-3 rounded-md">
          <h2 className="text-xl font-bold text-indigo-700">
            Features Section
          </h2>
        </div>
        <FeaturesSection
          value={content.features}
          onChange={(features) =>
            setContent((prev) => ({
              ...prev,
              features,
            }))
          }
        />
      </section>

      <section className="space-y-6">
        <div className="bg-teal-50 border-l-4 border-teal-500 px-4 py-3 rounded-md">
          <h2 className="text-xl font-bold text-teal-700">
            Best For Section
          </h2>
        </div>
        <BestForSection
          value={content.bestFor}
          onChange={(bestFor) =>
            setContent((prev) => ({
              ...prev,
              bestFor,
            }))
          }
        />
      </section>

      <section className="space-y-6">
        <div className="bg-red-50 border-l-4 border-red-500 px-4 py-3 rounded-md">
          <h2 className="text-xl font-bold text-red-700">
            Performance Section
          </h2>
        </div>
        <PerformanceSection
          value={content.performanceSection}
          onChange={(performanceSection) =>
            setContent((prev) => ({
              ...prev,
              performanceSection,
            }))
          }
        />
      </section>

      <section className="space-y-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-500 px-4 py-3 rounded-md">
          <h2 className="text-xl font-bold text-yellow-700">
            Pricing Section
          </h2>
        </div>
        <PricingSection
          value={content.pricing}
          onChange={(pricing) =>
            setContent((prev) => ({
              ...prev,
              pricing,
            }))
          }
        />
      </section>

      <section className="space-y-6">
        <div className="bg-slate-50 border-l-4 border-slate-500 px-4 py-3 rounded-md">
          <h2 className="text-xl font-bold text-slate-700">
            FAQ Section
          </h2>
        </div>
        <FAQSection
          value={content.faqs}
          onChange={(faqs) =>
            setContent((prev) => ({
              ...prev,
              faqs,
            }))
          }
        />
      </section>

      <section className="space-y-6">
        <div className="bg-emerald-50 border-l-4 border-emerald-500 px-4 py-3 rounded-md">
          <h2 className="text-xl font-bold text-emerald-700">
            CTA Banner Section
          </h2>
        </div>
        <CTABannerSection
          value={content.ctaBanner}
          onChange={(ctaBanner) =>
            setContent((prev) => ({
              ...prev,
              ctaBanner,
            }))
          }
        />
      </section>

      <button
        type="button"
        disabled={saving}
        onClick={
          hasContent
            ? handleSave
            : handleCreate
        }
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {saving
          ? "Saving..."
          : hasContent
            ? "Update Tool Content"
            : "Create Tool Content"}
      </button>
    </div>
  );
}
