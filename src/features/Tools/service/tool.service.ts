import axios from "../../../api/axios";

export const getTool = (
  id: string
) => {
  return axios.get(
    `/tools/${id}`
  );
};

export const createTool = (
  data: FormData
) => {
  return axios.post(
    "/tools",
    data,
  );
};

export const updateTool = (
  id: string,
  data: FormData
) => {
  return axios.put(
    `/tools/${id}`,
    data,
  );
};