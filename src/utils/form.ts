export const collectFormData = <T>(form: HTMLFormElement): T => {
  const formData = new FormData(form);

  return Object.fromEntries(formData.entries()) as T;
};
