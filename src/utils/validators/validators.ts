export type FieldValidatorTypes = (value: string) => string | undefined;
export const required: FieldValidatorTypes = (value) => {
  if (value) return undefined;

  return 'Field is required';
};

export const maxLengthCreator =
  (maxLength: number): FieldValidatorTypes =>
  (value) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
  };
