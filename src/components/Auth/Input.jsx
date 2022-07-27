import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const Input = ({
  half,
  name,
  onChange,
  label,
  type,
  handlePassword,
  autoFocus,
  required,
}) => {
  return (
    <Grid item xs={12} md={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={onChange}
        variant='outlined'
        required={required}
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handlePassword}>
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
