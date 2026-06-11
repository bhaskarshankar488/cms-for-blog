import axios from "../../../api/axios";

export const getPage = (
  id: string
) => {
  return axios.get(
    `/pages/id/${id}`
  );
};

export const createPage = (
  data: FormData
) => {
  return axios.post(
    "/pages",
    data,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );
};

export const updatePage = (
  id: string,
  data: FormData
) => {
  return axios.put(
    `/pages/${id}`,
    data,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );
};