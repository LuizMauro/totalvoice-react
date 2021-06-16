import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import MicOnIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import DialpadIcon from "@material-ui/icons/Dialpad";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import CallIcon from "@material-ui/icons/Call";
import CallEndIcon from "@material-ui/icons/CallEnd";

import { Context } from "../phone";

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red,
  },
});

const CallKey = ({ isHolding, onClick }) => (
  <Fab
    aria-label="call phone number"
    color={isHolding ? "primary" : "secondary"}
    onClick={onClick}
    onMouseDown={(e) => e.stopPropagation()}
  >
    {isHolding ? <CallIcon /> : <CallEndIcon />}
  </Fab>
);

const Controls = styled(({ className, number, onToggleKeypad }) => {
  const { isInCall, muteCall, startCall, endCall, disconnect, connect } =
    useContext(Context);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    muteCall();
    setIsMuted((isMuted) => !isMuted);
  };

  const isHolding = !isInCall();

  const toggleCall = () => (isHolding ? startCall(number) : endCall());

  return (
    <div className={className}>
      {!isHolding && (
        <div className="__group">
          <Button onClick={toggleMute}>
            {isMuted ? <MicOnIcon /> : <MicOffIcon />}
          </Button>
          <Button>
            <DialpadIcon onClick={onToggleKeypad} />
          </Button>
          <Button>
            <SwapHorizIcon onClick={() => {}} /> {/* TODO */}
          </Button>
          <button>teste</button>
        </div>
      )}
      <CallKey isHolding={isHolding} onClick={toggleCall} />
      <button onClick={disconnect}>Desconectar</button>
      <button onClick={connect}>Conectar</button>
    </div>
  );
})`
  display: flex;
  flex-direction: column;
  align-items: center;

  .__group {
    padding-bottom: 1rem;
  }
`;

Controls.dsiplayName = "Controls";

Controls.propTypes = {
  number: PropTypes.string,
  onToggleKeypad: PropTypes.func,
};

export default Controls;
