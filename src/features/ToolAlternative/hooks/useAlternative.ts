import { useState }
from "react";

import {
  initialAlternative,
}
from "../constants/alternative.initial";

export const useAlternative =
() => {
  const [
    formData,
    setFormData,
  ] = useState(
    initialAlternative
  );

  const [
    errors,
    setErrors,
  ] = useState<
    Record<
      string,
      string
    >
  >({});

  return {
    formData,
    setFormData,
    errors,
    setErrors,
  };
};