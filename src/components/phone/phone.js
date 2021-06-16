import React, {
  createContext,
  useReducer,
  useState,
  useRef,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Loading from "@material-ui/core/CircularProgress";

export const Context = createContext();

const DOMAIN = "*";

const initialState = {
  status: "",
  callId: "",
};

const reducer = (state, { type, payload }) => {
  console.log("action", { type, payload });

  if (payload.status === "desconectado") {
    alert("desconectado");
  }

  switch (type) {
    case "status":
      return { ...state, status: payload.status };
    default:
      return state;
  }
};

const Phone = styled(({ className, src, number, startCalling, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(true);
  const iFrameRef = useRef();

  const actions = {
    isInCall: () => {
      const { status } = state;
      return (
        status === "chamando" ||
        status === "conversando" ||
        status === "encerrando"
      );
    },
    connect: () => {
      postMessage({ message: "conectar" });
    },
    disconnect: () => {
      postMessage({ message: "desconectar" });
    },
    startCall: (numero) => {
      postMessage({ message: "chamaNumero", numero });
    },
    endCall: () => {
      postMessage({ message: "hangup" });
    },
    muteCall: () => {
      postMessage({ message: "mute" });
    },
    transferCall: (numeroTelefone) => {
      postMessage({ message: "transferir", numeroTelefone });
    },
    answerCall: () => {
      postMessage({ message: "answer" });
    },
    sendDtmf: (dtmf) => {
      postMessage({ message: "enviaDTMF", dtmf });
    },
  };

  useEffect(() => {
    window.onmessage = ({ data }) => {
      const { message: type, ...payload } = data;
      if (type === "status" && payload.status === "encerrada") {
        dispatch({
          type: "status",
          payload: { status: "desligando" },
        });
        setTimeout(
          () =>
            dispatch({
              type: "status",
              payload: { status: "encerrada" },
            }),
          2000
        );
      } else if (type === "status" && payload.status === "conectado") {
        !!startCalling && actions.startCall(number);
      } else {
        dispatch({ type, payload });
      }
    };
  }, []);

  const handleLoad = () => setIsLoading(false);

  const postMessage = (message) => {
    const { current } = iFrameRef;
    current && current.contentWindow.postMessage(message, DOMAIN);
  };

  const value = { ...state, ...actions };

  return (
    <div className={className}>
      <iframe
        ref={iFrameRef}
        className="__widget"
        title="webphone"
        allow="microphone; autoplay"
        src={src}
        onLoad={handleLoad}
      />
      <Context.Provider value={value}>
        {isLoading ? <Loading /> : children}
      </Context.Provider>
    </div>
  );
})`
  display: flex;
  flex-direction: column;
  align-items: center;

  .__widget {
    display: none;
    padding: 0;
    margin: 0;
    width: "100%";
    height: "100%";
    border: "none";
  }
`;

Phone.displayName = "Phone";

Phone.propTypes = {
  src: PropTypes.string,
};

export default Phone;
