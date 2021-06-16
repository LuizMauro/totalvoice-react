import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Typography from "@material-ui/core/Typography";
import PhoneForwardedIcon from "@material-ui/icons/PhoneForwarded";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import CallEndIcon from "@material-ui/icons/CallEnd";

import { Context } from "../phone";

const TYPES = {
  chamando: {
    icon: PhoneForwardedIcon,
    text: "Chamando",
  },
  conversando: {
    icon: PhoneInTalkIcon,
    text: "Conversando",
  },
  desligando: {
    icon: CallEndIcon,
    text: "Encerrando",
  },
};

const Status = styled(({ className }) => {
  const { status } = useContext(Context);

  if (!TYPES[status]) return null;

  const Icon = TYPES[status].icon;

  return (
    <Typography className={className} variant="body1" gutterBottom>
      <Icon /> {TYPES[status].text}
    </Typography>
  );
})`
  display: flex;
  align-items: center;
  justify-content: center;
`;

Status.displayName = "Status";

Status.propTypes = {
  className: PropTypes.string,
};

export default Status;
