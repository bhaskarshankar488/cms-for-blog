import { useState } from "react";

import {getPage} from "../services/page.service"
import {getCategories} from "../services/category.service"

export default function usePageData() {

  const [categories, setCategories] =
    useState<any[]>([]);

  const fetchCategories =
    async () => {

      try {

        const res = await getCategories();

        setCategories(
          res.data.data || []
        );

      } catch (err) {

        console.error(err);

      }
    };

  const fetchPage = async (
    id: string,
    setForm: any,
    setContent: any,
    setCatImagePreview: any
  ) => {

    try {

     const res = await getPage(id);

      const data =
        res.data.data;

      setForm({

        title:
          data.title || "",

        slug:
          data.slug || "",

        pageDescription:
          data.pageDescription || "",

        categoryId:
          data.categoryId?._id ||
          data.categoryId ||
          "",

        categoryDescription:
          data.categoryDescription || "",

        catImage:
          data.catImage || {
            url: "",
            public_id: "",
          },

        meta: {
          title:
            data.meta?.title || "",

          description:
            data.meta?.description || "",

          keywords:
            data.meta?.keywords || [],
        },

        tools:
          data.tools?.map(
            (tool: any) => ({
              toolId:
                tool.toolId?._id ||
                tool.toolId ||
                "",

              name:
                tool.name ||
                tool.toolId?.name ||
                "",

              image:
                tool.image ||
                tool.toolId?.image ||
                {},

              customDescription:
                tool.customDescription ||
                "",
            })
          ) || [],

        faq:
          data.faq || [],
      });

      setContent(
        data.content || ""
      );

      setCatImagePreview(
        data.catImage?.url || ""
      );

    } catch (err) {

      console.error(
        "Fetch error:",
        err
      );

    }
  };

  return {
    categories,

    fetchCategories,

    fetchPage,
  };
}