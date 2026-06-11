export function useFaqManager(
  form: any,
  setForm: any
) {

  const addFaq = () => {

    setForm({
      ...form,

      faq: [
        ...form.faq,
        {
          question: "",
          answer: "",
        },
      ],
    });
  };

  const removeFaq = (
    index: number
  ) => {

    const updated =
      [...form.faq];

    updated.splice(index, 1);

    setForm({
      ...form,
      faq: updated,
    });
  };

  const updateFaq = (
    index: number,
    field: string,
    value: string
  ) => {

    const updated =
      [...form.faq];

    updated[index][field] =
      value;

    setForm({
      ...form,
      faq: updated,
    });
  };

  return {
    addFaq,
    removeFaq,
    updateFaq,
  };
}