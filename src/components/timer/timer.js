import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Chip from "@material-ui/core/Chip";

import { Context } from "../phone";

const Timer = styled(() => {
  const { isInCall } = useContext(Context);
  const [date, setDate] = useState();

  const format = number => (number < 10 ? `0${number}` : number);

  useEffect(() => {
    const initialDate = new Date();
    const interval = setInterval(() => {
      const currentDate = new Date();
      setDate(new Date(currentDate - initialDate));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const label = date
    ? `${format(date.getMinutes())}:${format(date.getSeconds())}`
    : "00:00";

  return isInCall() && <Chip label={label} />;
})``;

Timer.displayName = "Timer";

Timer.propTypes = {
  onLoad: PropTypes.func
};

export default Timer;
