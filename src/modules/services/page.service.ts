import axios from "../../api/axios"

export const getPage = (id) =>
  axios.get(`/pages/id/${id}`);

export const createPage = (data) =>
  axios.post("/pages", data);

export const updatePage = (id, data) =>
  axios.put(`/pages/${id}`, data);

export const getCategories = () =>
  axios.get("/categories");