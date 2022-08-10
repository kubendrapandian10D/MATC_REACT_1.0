import React from "react";
import { FieldProps, getIn } from "formik";
import { TextFieldProps, TextField } from "@mui/material";

export const FormTextField: React.FC<FieldProps & TextFieldProps> = (props) => {
  const isTouched = getIn(props.form.touched, props.field.name);
  const errorMessage = getIn(props.form.errors, props.field.name);

  const { error, helperText, field, ...rest } = props;

  return (
    <TextField
      variant="outlined"
      inputProps={{ "data-testid": `test_${props.field.name}` }}
      error={error ?? Boolean(isTouched && errorMessage)}
      helperText={helperText ?? (isTouched && errorMessage ? errorMessage : undefined)}
      {...rest}
      {...field}
    />
  );
};
