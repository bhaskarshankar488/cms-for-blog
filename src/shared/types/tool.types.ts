export interface ToolFormData {
  title: string;
  slug: string;
  description: string;
  brand: string;
  link: string;
  categoryId: string;

  ratingValue: number | "";
  ratingCount: number | "";
  reviewCount: number | "";

  tags: string[];
}

export interface ToolOption {
    id: string;
    name: string;
    slug: string;
    brand: string;
    image: string;
}

export interface ToolMultiSelectProps {
    value: string[];
    onChange: (ids: string[]) => void;

    initialSelectedTools?: ToolOption[];

    label?: string;
    placeholder?: string;
}

export interface ToolOption {
  id: string;
  name: string;
  slug: string;
  brand: string;
  image: string;
}

export interface ToolSelectorProps {
    onSelect: (
        tool: ToolOption
    ) => void;

    label?: string;
    placeholder?: string;
}