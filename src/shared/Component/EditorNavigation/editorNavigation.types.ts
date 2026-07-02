export interface EditorNavigationItem {
  id: string;
  label: string;
}

export interface EditorNavigationGroup {
  title: string;
  items: EditorNavigationItem[];
}