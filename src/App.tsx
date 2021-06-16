import React from "react";

import WebPhone from "./Modificado.js";
import Error from "./components/error";
import Dialer from "./components/dialer";

function App() {
  const src =
    "https://api2.totalvoice.com.br/w3/phone.php?key=8d8ab641751e858dea5ca8ceaf23d7b9&tipo=hidden";
  const contact = {
    name: "Luiz Mauro",
    phone: "12996020481",
  };

  return (
    <>
      <Error>
        <Dialer src={src} contact={contact} />
      </Error>
      {/* <WebPhone /> */}
    </>
  );
}

export default App;
