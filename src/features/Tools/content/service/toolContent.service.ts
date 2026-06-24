import axios from "../../../../api/axios";

import type {
  ToolContent,
} from "../types/toolContent.types";

export const getToolContent = (
  toolId: string
) => {
  return axios.get(
    `/tool-content/${toolId}`
  );
};

// CREATE ToolContent
export const createToolContent = (
  data: ToolContent
) => {
  return axios.post(
    "/tool-content",
    data
  );
};

// UPDATE ToolContent
export const updateToolContent = (
  toolId: string,
  data: Partial<ToolContent>
) => {
  return axios.put(
    `/tool-content/${toolId}`,
    data
  );
};

// GET Tool + ToolContent
export const getToolWithContent = (
  toolId: string
) => {
  return axios.get(
    `/tool-content/${toolId}/full`
  );
};

export const searchAlternatives = (
  search: string
) => {
  return axios.get(
    `/tools/?search=${search}`
  );
};