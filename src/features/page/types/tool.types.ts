export interface PageTool {
  toolId: string;
  name: string;

  image?: {
    url?: string;
    public_id?: string;
  };

  customDescription: string;
}