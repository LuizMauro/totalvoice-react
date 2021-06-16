import React, { useEffect, useRef } from "react";
import IframeComm from "react-iframe-comm";
// import { Container } from './styles';

const Modificado = () => {
  const webphoneRef = useRef(null);

  const attributes = {
    src: "https://voice-app.zenvia.com/w3/?key=6d134a9701ae897bf1a7c4c87838fd0e&tipo=embedded&fechar_fim=0&ver=2",
    width: "100%",
    height: "175",
    frameBorder: 1, // show frame border just for fun...
  };

  const windowListener = (e) => {
    //quando receber uma ligacao
    if (e.data.message === "chegandoChamada") {
      alert(
        "Chegando Chamada de " +
          e.data.numeroChegando +
          " para: " +
          e.data.numeroDestino +
          " chamada_recebida_id: " +
          e.data.chamadaRecebidaId
      );
    }
    //conectado, desconectado, chamando, encerrada, conversando
    if (e.data.message === "status") {
      alert("Status: " + e.data.status);
    }
    //o id é único e pode ser utilizado na api para recuperação de mais informações (get na api ou webhooks)
    if (e.data.message === "chamada_id") {
      alert("Chamada_id: " + e.data.chamada_id);
    }
    //os erros são finais
    if (e.data.message === "status_erro") {
      alert("Sem Permissão: " + e.data.status_erro);
    }

    //rebendo o status de diagnóstico de internet e computador para verificar qualidade de ligação
    if (e.data.message === "stats_webphone") {
      alert(
        "Internet: " + e.data.internet + " e computador: " + e.data.computador
      );
    }

    if (e.data.message === "pausou_na_fila") {
      // Evento disparado quando o ramal é pausado na fila
    } else if (e.data.message === "despausou_na_fila") {
      // Evento disparado quando o ramal é despausado na fila
    } else if (e.data.message === "entrou_na_fila") {
      // Evento disparado quando o ramal entra na fila
    } else if (e.data.message === "saiu_da_fila") {
      // Evento disparado quando o ramal sai da fila
    }
  };

  //encerra chamada ativa
  function desligaChamada() {
    webphoneRef.current.contentWindow.postMessage(
      {
        message: "hangup",
      },
      "*"
    );
  }

  //Conecta o webphone para coloca-lo em operação
  function conectar() {
    webphoneRef.current.contentWindow.postMessage({ message: "conectar" }, "*");
  }

  //desconecta o webphone - ele nao recebe nem envia mais chamadas
  function desconectar() {
    postMessage({ message: "desconectar" });
  }

  //telefona para um número
  function chamaNumero(numero) {
    webphoneRef.current.contentWindow.postMessage(
      {
        message: "chamaNumero",
        numero: numero,
      },
      "*"
    );
  }

  //atender
  function atender() {
    webphoneRef.current.contentWindow.postMessage(
      {
        message: "answer",
      },
      "*"
    );
  }

  //para uso com uras
  function enviaDTMF(meuDTMF) {
    webphoneRef.current.contentWindow.postMessage(
      {
        message: "enviaDTMF",
        dtmf: meuDTMF,
      },
      "*"
    );
  }

  //mute microfone
  function mute() {
    webphoneRef.current.contentWindow.postMessage(
      {
        message: "mute",
      },
      "*"
    );
  }

  //transferencia blind - encerra a ligação aqui e transfere para o numero
  function transferir(numeroTelefone) {
    webphoneRef.current.contentWindow.postMessage(
      {
        message: "transferir",
        numeroTelefone: numeroTelefone,
      },
      "*"
    );
  }

  //transferencia com consulta
  function transferirConsulta(numeroTelefone) {
    webphoneRef.current.contentWindow.postMessage(
      {
        message: "transferirConsulta",
        numeroTelefone: numeroTelefone,
      },
      "*"
    );
  }

  function recstart() {
    webphoneRef.current.contentWindow.postMessage(
      {
        message: "recStart",
      },
      "*"
    );
  }

  function recstop() {
    webphoneRef.current.contentWindow.postMessage(
      {
        message: "recStop",
      },
      "*"
    );
  }

  function pausarNaFila(filaId) {
    console.log(filaId);

    // webphoneRef.current.contentWindow.postMessage(
    //   {
    //     message: "pausarNaFila",
    //     filaId: filaId,
    //   },
    //   "*"
    // );
  }

  function despausarNaFila(filaId) {
    webphoneRef.current.contentWindow.postMessage(
      {
        message: "despausarNaFila",
        filaId: filaId,
      },
      "*"
    );
  }

  function entrarNaFila(filaId) {
    webphoneRef.current.contentWindow.postMessage(
      {
        message: "entrarNaFila",
        filaId: filaId,
      },
      "*"
    );
  }

  function sairDaFila(filaId) {
    webphoneRef.current.contentWindow.postMessage(
      {
        message: "sairDaFila",
        filaId: filaId,
      },
      "*"
    );
  }

  const postMessage = (message) => {
    const { current } = webphoneRef;
    current && current.contentWindow.postMessage(message, "*");
  };

  useEffect(() => {
    if (webphoneRef.current) {
      window.addEventListener("message", windowListener);

      // remove o event listener quando o componente for unmounted
      return () => window.removeEventListener("message", windowListener);
    }
  }, [webphoneRef]);

  return (
    <>
      <div id="teste"></div>
      {/* <IframeComm
        attributes={attributes}
        // postMessageData={postMessageData}
        handleReady={onReady}
        handleReceiveMessage={onReceiveMessage}
      /> */}
      <iframe
        id="unqiframe"
        title="Telefone"
        allow="microphone"
        src="https://api2.totalvoice.com.br/w3/phone.php?key=8d8ab641751e858dea5ca8ceaf23d7b9&tipo=hidden"
        ref={webphoneRef}
        style={{ display: "none" }}
      />
      <br />
      <input type="button" onClick={conectar} value="Conectar" /> (o sistema
      conecta sozinho por default ao abrir)
      <br />
      <input type="button" onClick={desconectar} value="Desconectar" /> (nao
      recebe nem faz mais chamadas)
      <br />
      <input type="button" onClick={desligaChamada} value="Desliga" />
      <input
        type="button"
        onClick={() => chamaNumero(4001)}
        value="Chama 4001"
      />
      <br />
      <input
        type="button"
        onClick={() => chamaNumero(12996020481)}
        value="Chama 12996020481"
      />
      <br />
      <br /> (DTMF: 0,1,2,3,4,5,6,7,8,9,*,#)
      <br />
      <input type="button" onClick={() => enviaDTMF("1")} value="DTMF 1" />
      <br />
      <input type="button" onClick={() => enviaDTMF("2")} value="DTMF 2" />
      <br />
      <input type="button" onClick={() => enviaDTMF("0")} value="DTMF 0" />
      <br />
      <input type="button" onClick={() => enviaDTMF("*")} value="DTMF *" />
      <br />
      <input type="button" onClick={() => enviaDTMF("#")} value="DTMF #" />
      <br />
      <input type="button" onClick={mute} value="Mute/Unmute" />
      <br />
      <br />
      <input
        type="button"
        onClick={() => transferirConsulta("4000")}
        value="Transferir Consulta para 4998"
      />
      <br />
      <input
        type="button"
        onClick={() => transferir("4515")}
        value="Transferir para 4515"
      />
      <input type="button" onClick={atender} value="Atender" />
      <br />
      <br />
      <input type="button" onClick={recstart} value="REC Start" />
      <input type="button" onClick={recstop} value="REC Stop" />
      <br />
      <br />
      <input
        type="button"
        onClick={pausarNaFila}
        value="Pausar em todas filas"
      />
      <input
        type="button"
        onClick={despausarNaFila}
        value="Despausar em todas filas"
      />
      <br />
      <br />
      <input
        type="button"
        onClick={() => entrarNaFila(47)}
        value="Entrar na fila 47"
      />
      <input
        type="button"
        onClick={() => sairDaFila(47)}
        value="Sair da fila 47"
      />
    </>
  );
};

export default Modificado;
