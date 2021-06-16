import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import BackspaceIcon from "@material-ui/icons/Backspace";

const DialerInput = styled(({ className, value, onChange, ...rest }) => {
  const handleInputChange = event => {
    const value = event.target.value;
    onChange(value);
  };

  const handleBackspaceClick = () => {
    handleInputChange({
      target: {
        value: value.slice(0, -1)
      }
    });
  };

  return (
    <FormControl className={className}>
      <Input
        {...rest}
        value={value}
        onChange={handleInputChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="backspace phone number"
              onClick={handleBackspaceClick}
              onMouseDown={handleBackspaceClick}
            >
              <BackspaceIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
})``;

DialerInput.displayName = "DialerInput";

DialerInput.propTypes = {
  onChange: PropTypes.func // a handler function to change event that receive the value inputed
};

export default DialerInput;
