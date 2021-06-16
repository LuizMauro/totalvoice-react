import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Phone from "../phone";
import Input from "../input";
import Status from "../status";
import Timer from "../timer";
import Keypad from "../keypad";
import Controls from "../controls";

const Dialer = styled(({ className, src, contact, startCalling }) => {
  const [number, setNumber] = useState(contact.phone);
  const [isKeypadOpened, setKeypadOpened] = useState(true);
  const handleToggleKeypad = () => {
    setKeypadOpened((isKeypadOpened) => !isKeypadOpened);
  };

  return (
    <Phone
      className={className}
      src={src}
      number={number}
      startCalling={startCalling}
    >
      <Input
        value={number}
        placeholder="Digite ou pressione os números"
        onChange={setNumber}
      />
      <Status />
      {/* <Timer /> */}
      {isKeypadOpened && <Keypad value={number} onChange={setNumber} />}
      <Controls number={number} onToggleKeypad={handleToggleKeypad} />
    </Phone>
  );
})`
  max-width: 257px;
`;

Dialer.displayName = "Dialer";

Dialer.propTypes = {
  src: PropTypes.string,
  contact: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
  }),
  startCalling: PropTypes.bool, // TODO
};

export default Dialer;
