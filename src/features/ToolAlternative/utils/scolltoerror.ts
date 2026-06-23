export const scrollToError = (
    errors: Record<
      string,
      string
    >
  ) => {
    const firstField =
      Object.keys(
        errors
      )[0];

    const element =
      document.getElementById(
        firstField
      );

    if (!element) {
      console.warn(
        `Field not found: ${firstField}`
      );

      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    setTimeout(() => {
      (
        element as HTMLElement
      ).focus();
    }, 300);
  };