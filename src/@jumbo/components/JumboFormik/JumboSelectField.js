import React from "react";
import { useField } from "formik";
import FormHelperText from "@mui/material/FormHelperText";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import Select from "@mui/material/Select";

const JumboSelectField = (props) => {
  const { theme } = useJumboTheme();
  const [field, meta] = useField(props);
  const { defaultValue, ...restProps } = props;
  const errorText = meta.error && meta.touched ? meta.error : "";
  const value = field.value || defaultValue || "";

  return (
    <React.Fragment>
      <Select {...restProps} {...field} value={value} error={!!errorText} />
      {!props.disabled && (
        <FormHelperText style={{ color: theme.palette.error.main }}>
          {errorText}
        </FormHelperText>
      )}
    </React.Fragment>
  );
};

export default JumboSelectField;
