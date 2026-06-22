import axios from "../../../api/axios";

export const createAlternative =
  async (data: any) => {
    const response =
      await axios.post(
        "/alternatve/",
        data
      );

    return response.data;
  };

export const updateAlternative =
  async (
    id: string,
    data: any
  ) => {
    const response =
      await axios.put(
        `/alternatve/${id}`,
        data
      );

    return response.data;
  };

export const getAlternative =
  async (id: string) => {
    const response =
      await axios.get(
        `/alternatve/${id}`
      );

    return response.data;
  };

export const getAlternatives =
  async () => {
    const response =
      await axios.get(
        "/alternatve"
      );

    return response.data;
  };

  export const searchToolsApi =
  async (
    query: string
  ) => {
    const response =
      await axios.get(
        `/tools?search=${query}`
      );

    return response.data.data;
  };