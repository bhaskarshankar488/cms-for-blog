import { FormSection } from "./FormFields";
import { BlogEditor } from "./ListEditors";

import type { Blog } from "../types/toolContent.types";

interface Props {
  value: Blog[];
  onChange: (value: Blog[]) => void;
}

export default function LatestBlogsSection({
  value,
  onChange,
}: Props) {
  return (
    <FormSection title="Latest Blogs">
      <BlogEditor
        items={value}
        onChange={onChange}
      />
    </FormSection>
  );
}
