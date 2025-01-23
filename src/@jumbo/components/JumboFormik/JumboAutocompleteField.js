import React from "react";
import { useField } from "formik";
import { Autocomplete, FormHelperText, TextField } from "@mui/material";

const JumboAutocomplete = ({ label, options, ...props }) => {
  const [field, meta, helpers] = useField(props);

  const getOptionLabel = (option) => {
    // modify this function to display the desired value
    return option.values;
  };

  return (
    <>
      <Autocomplete
        options={options}
        getOptionLabel={getOptionLabel}
        onChange={(e, value) => {
          helpers.setValue(value ? value.value : "");
        }}
        onBlur={() => helpers.setTouched(true)}
        value={options.find((option) => option.value === field.value) || null}
        renderInput={(params) => (
          <TextField
            {...field}
            {...props}
            {...params}
            label={label}
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
          />
        )}
      />
    </>
  );
};

export default JumboAutocomplete;
