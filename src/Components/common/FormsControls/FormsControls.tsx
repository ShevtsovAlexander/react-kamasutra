import * as React from 'react';
import styles from './FormsControls.module.css';
import { Field } from 'redux-form';
import { FieldValidatorTypes } from '../../../utils/validators/validators';
import { WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';

type FormsControlPropsType = {
  meta: WrappedFieldMetaProps;
  children: React.ReactNode;
};

const FormControl: React.FC<FormsControlPropsType> = ({ meta: { touched, error }, children }) => {
  const hasError = touched && error;
  return (
    <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
      <div>{children}</div>
      {hasError && <span>{error}</span>}
    </div>
  );
};

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

export const Input: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};
export const createField = (
  placeholder: string | null,
  name: string,
  validators: Array<FieldValidatorTypes>,
  component: React.FC<WrappedFieldProps>,
  props = {},
  text = '',
) => (
  <div>
    <Field placeholder={placeholder} name={name} validate={validators} component={component} {...props} /> {text}
  </div>
);
