import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const KeypadKey = styled(({ className, number, letters, onClick }) => {
  const handleClick = () => onClick(number);
  return (
    <Button className={className} onClick={handleClick}>
      {number}
      {letters && <small className="__letters">{letters}</small>}
    </Button>
  );
})`
  display: flex;
  flex-direction: column;

  .__letters {
    font-size: 0.5rem;
    text-transform: uppercase;
  }
`;

const Keypad = styled(({ className, value, onChange }) => {
  const handleClick = number => onChange(value + number);

  return (
    <div className={className}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <KeypadKey number="1" onClick={handleClick} />
        </Grid>
        <Grid item xs={4}>
          <KeypadKey number="2" letters="abc" onClick={handleClick} />
        </Grid>
        <Grid item xs={4}>
          <KeypadKey number="3" letters="def" onClick={handleClick} />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <KeypadKey number="4" letters="ghi" onClick={handleClick} />
        </Grid>
        <Grid item xs={4}>
          <KeypadKey number="5" letters="jkl" onClick={handleClick} />
        </Grid>
        <Grid item xs={4}>
          <KeypadKey number="6" letters="mno" onClick={handleClick} />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <KeypadKey number="7" letters="pqrs" onClick={handleClick} />
        </Grid>
        <Grid item xs={4}>
          <KeypadKey number="8" letters="tuv" onClick={handleClick} />
        </Grid>
        <Grid item xs={4}>
          <KeypadKey number="9" letters="wxyz" onClick={handleClick} />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <KeypadKey number="#" onClick={handleClick} />
        </Grid>
        <Grid item xs={4}>
          <KeypadKey number="0" letters="+" onClick={handleClick} />
        </Grid>
        <Grid item xs={4}>
          <KeypadKey number="#" onClick={handleClick} />
        </Grid>
      </Grid>
    </div>
  );
})`
  padding: 1rem 0;
`;

Keypad.defaultProps = {
  onChange: () => {}
};

Keypad.displayName = "Keypad";

Keypad.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default Keypad;
