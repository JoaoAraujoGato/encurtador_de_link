import "./Encurtador.css";
import { React, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import axios from "axios";

function Encurtador() {
  const [shortenedLink, setShortenedLink] = useState("");
  const [userInput, setUserInput] = useState("");
  const fetchData = async () => {
    try {
      const response = await axios(
        `https://api.shrtco.de/v2/shorten?url=${userInput}`
      );
      setShortenedLink(response.data.result.full_short_link);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className=" container h-screen flex justify-center items-center">
      <div className=" text-center">
        <div>
        <header className="p-4 mb-10 bg-indigo-500">
          
            <div className="max-w-5xl m-auto">
              <div className="text-xl font-bold text-white">Encurtador de Links</div>
            </div>
          </header>
          <input
            className="outline-none border-2 border-indigo-500 rounded-md backdrop-blur-xl bg-white/20 shadow-md px-3 py-3"
            type="text"
            placeholder="Insira aqui o link"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
          <button
            className=" bg-indigo-500 text-white px-8 py-3 ml-4 rounded-md"
            onClick={() => {
              fetchData();
            }}
          >
            Encurtar URL
          </button>
          <div className=" mt-5">
            {shortenedLink}
            <CopyToClipboard text={shortenedLink}>
              <button className="border-2 border-indigo-500 text-indigo-500 font-medium px-5 py-2 ml-4 rounded-md">
                Copiar URL
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Encurtador;

// import React from "react";
// import { useHistory } from "react-router-dom";

// export default function Encurtador(){
//     const history = useHistory();
//     return (
//         <>
//             <h1>Encurtador</h1>
//             <button onClick={() => history.push("/login")}>Login</button>
//             <button onClick={() => history.push("/perfil")}>Perfil</button>
//             <button onClick={() => history.push("/cadastro")}>Cadastro</button>
//             <button onClick={() => history.push("/")}>Encurtador</button>
//         </>
//     )
// }