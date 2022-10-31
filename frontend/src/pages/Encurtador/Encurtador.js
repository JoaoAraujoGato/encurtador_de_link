import "./Encurtador.css";
import { React, useState } from "react";
import axios from "axios";
import { Form, FormGroupInput } from "react-bootstrap-utils";
import api from "../../services/api";
import { USER_ID } from "../../services/auth";
import QRCodeCanvas from "../QRCode/QRCodeCanvas";

export default function Encurtador() {
  const [shortenedLink, setShortenedLink] = useState("");
  const [link, setDadosLink] = useState();
  const [idLink, setLinkId] = useState("");
  const idUsuario = sessionStorage.getItem(USER_ID);
  async function encurtarLink({titulo, linkOriginal}){
    const responseEncurtador = await axios(
      `https://api.shrtco.de/v2/shorten?url=${linkOriginal}`
    );
    setShortenedLink(responseEncurtador.data.result.full_short_link);
    
    if(!idUsuario) {
      return;
    }

    const dadosLink = {
      userId: idUsuario,
      titulo: titulo,
      linkEncurtado: responseEncurtador.data.result.full_short_link,
      linkOriginal: linkOriginal,
      contadorCliques: "1",
    };

    setDadosLink(dadosLink);

    try {
      const response = await api.post("/link", dadosLink);
      setLinkId(response.data);
    } catch(error) {
      console.warn(error);
    }
  }

  async function copyLink() {
    await navigator.clipboard.writeText(shortenedLink);
    if(idUsuario){
      const numeroCliques = parseInt(link.contadorCliques, 10) + 1;
      await api.put(`link/${idLink.linkId}`, {contadorCliques: numeroCliques.toString()});
    }
  }

  return (
    <div className="fullPageEncurtador d-flex justify-content-center flex-column">
      <h2>Encurtar Link</h2>
      <div className="boxEncurtador mt-2">
        <Form
          onSubmit={(dadosForm) => encurtarLink(dadosForm)}
          initialValues={{}}
          customActions={
            <div className="d-flex justify-content-center">
              <button className="btn btn-sm" type="submit">Encurtar Link</button>
            </div>
          }
        >
          <div className="col">
            <div className="col">
                <FormGroupInput
                    name="titulo"
                    type="string"
                    label="Titulo"
                    required
                />
            </div>
            <div className="col">
                <FormGroupInput
                    name="linkOriginal"
                    type="string"
                    label="Link original"
                    required
                />
            </div>
          </div>
        </Form>

        <div className="d-flex justify-content-center align-items-center flex-column mb-2">
          <div className="d-flex align-items-center flex-column mt-5">
            <h6>{shortenedLink}</h6>
            <button type="button" className="btn btn-sm" onClick={copyLink}>
              Copiar Link
            </button>
          </div>
          <QRCodeCanvas text={shortenedLink} />
        </div>
      </div>
    </div>
  );
}
