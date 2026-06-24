import axios from "../../api/axios";
import type { ToolOption } from "../types/tool.types";

interface ToolSearchResponse {
  success: boolean;
  message: string;
  data: ToolOption[];
}

export const searchTools = async (
  query: string
): Promise<ToolOption[]> => {
  const response =
    await axios.get<ToolSearchResponse>(
      `/tools/search/?search=${query}`
    );

  return response.data.data;
};