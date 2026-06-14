import axios from "./../../api/axios";

export const getCategories =
  () => {
    return axios.get(
      "/categories"
    );
  };